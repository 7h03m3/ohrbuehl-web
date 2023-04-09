import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../../database/users/users.service';
import { UserEntity } from '../../database/entities/user.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { Role } from '../../shared/enums/role.enum';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';
import { AuthService } from '../../auth/auth.service';
import { UserDto } from '../../shared/dtos/user.dto';
import { NotificationManagerService } from '../../notification-manager/notification-manager.service';
import { NotificationSource } from '../../shared/enums/notification-source.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
    private notificationManager: NotificationManagerService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  public getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  public getById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async createUser(@Body() createUserDto: UserCreateDto): Promise<UserEntity> {
    createUserDto.password = await this.authService.hashPassword(createUserDto.password);
    const newUser = await this.userService.createUser(createUserDto);

    await this.notificationManager.addEvent(NotificationSource.User, newUser.id);

    return newUser;
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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async deleteUser(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findOne(id);

    const returnValue = await this.userService.deleteUser(id);

    await this.notificationManager.deleteEvent(NotificationSource.User, id, user.userName);

    return returnValue;
  }
}
