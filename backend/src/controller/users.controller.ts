import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "../database/users/users.service";
import { User } from "../database/entities/user.entity";
import { Roles } from "../shared/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoleAuthGuard } from "../auth/guards/role-auth-guard.service";
import { Role } from "../shared/enums/role.enum";
import { UserCreateDto } from "../shared/dtos/user-create.dto";
import { AuthService } from "../auth/auth.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService, private authService: AuthService) {
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(":id")
  getById(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: UserCreateDto): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    return this.userService.createUser(createUserDto, hashedPassword);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async updateUser(@Body() userDto: User): Promise<any> {
    if (userDto.password != "") {
      const hashedPassword = await this.authService.hashPassword(userDto.password);
      return this.userService.updateUserWithPassword(userDto, hashedPassword);
    } else {
      return this.userService.updateUser(userDto);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<any> {
    return this.userService.deleteUser(id);
  }

}
