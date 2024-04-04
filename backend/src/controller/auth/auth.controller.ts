import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { UserPasswordChangeDto } from '../../shared/dtos/user-password-change.dto';
import { UserEntity } from '../../database/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/password')
  async update(@Body() dto: UserPasswordChangeDto, @Request() req): Promise<UserEntity> {
    return this.authService.updatePassword(dto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile ')
  getProfile(@Request() req) {
    return req.user;
  }
}
