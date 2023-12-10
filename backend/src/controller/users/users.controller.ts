import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../database/users/users.service';
import { UserEntity } from '../../database/entities/user.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { Role } from '../../shared/enums/role.enum';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';
import { AuthService } from '../../auth/auth.service';
import { UserDto } from '../../shared/dtos/user.dto';
import { BusinessHoursHelperService } from '../business-hours/helpers/business-hours-helper.service';
import { MailService } from '../../mail/mail.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('users/')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private businessHourService: BusinessHoursHelperService,
    private authService: AuthService,
    private mailService: MailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  public getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  public getById(@Param('id') id: number, @Request() req: any): Promise<UserEntity> {
    if (req.user.roles != Role.Admin) {
      if (req.user.id != id) {
        const errorMessage = 'access denied to user with id ' + id;
        throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
      }

      return this.userService.findOneUser(id);
    }
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async createUser(@Body() createUserDto: UserCreateDto): Promise<UserEntity> {
    createUserDto.password = await this.authService.hashPassword(createUserDto.password);
    return this.userService.createUser(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async updateUser(@Body() userDto: UserDto): Promise<any> {
    if (userDto.password != '') {
      userDto.password = await this.authService.hashPassword(userDto.password);
      return this.userService.updateUserWithPassword(userDto);
    } else {
      return await this.userService.updateUser(userDto);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('account-information')
  public async updateAccountInformation(@Body() userDto: UserDto, @Request() req: any): Promise<any> {
    if (req.user.id != userDto.id) {
      const errorMessage = 'access denied to user with id ' + userDto.id;
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }

    return this.userService.updateAccountInformation(userDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async deleteUser(@Param('id') id: number): Promise<any> {
    await this.businessHourService.deleteUser(id);
    return await this.userService.deleteUser(id);
  }
}
