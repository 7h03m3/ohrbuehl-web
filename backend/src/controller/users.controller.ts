import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "../database/users/users.service";
import { User } from "../database/entities/user.entity";
import { Roles } from "../shared/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoleAuthGuard } from "../auth/guards/role-auth-guard.service";
import { Role } from "../shared/enums/role.enum";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
