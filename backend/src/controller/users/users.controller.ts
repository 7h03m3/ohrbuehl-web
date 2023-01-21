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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private authService: AuthService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  getById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: UserCreateDto): Promise<UserEntity> {
    createUserDto.password = await this.authService.hashPassword(createUserDto.password);
    return this.userService.createUser(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async updateUser(@Body() userDto: UserDto): Promise<any> {
    if (userDto.password != '') {
      userDto.password = await this.authService.hashPassword(userDto.password);
      return this.userService.updateUserWithPassword(userDto);
    } else {
      return this.userService.updateUser(userDto);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
