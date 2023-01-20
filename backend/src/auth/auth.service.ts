import { Injectable } from '@nestjs/common';
import { UsersService } from '../database/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';

@Injectable()
export class AuthService {
  hashRounds = 10;

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      return null;
    }

    const isMatch = await this.comparePassword(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userEntity = await this.usersService.findOne(user.id);

    let assignedOrganizationId = 0;
    if (userEntity.assignedOrganizationId != null) {
      assignedOrganizationId = userEntity.assignedOrganizationId;
    }

    const payload = {
      userName: user.userName,
      id: user.id,
      roles: user.roles,
      assignedOrganizationId: assignedOrganizationId,
    };

    const loginInformation = new JwtLoginInformation();
    loginInformation.access_token = this.jwtService.sign(payload);
    loginInformation.userName = user.userName;
    loginInformation.id = user.id;
    loginInformation.roles = user.roles;
    loginInformation.assignedOrganizationId = assignedOrganizationId;

    return loginInformation;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.hashRounds);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
