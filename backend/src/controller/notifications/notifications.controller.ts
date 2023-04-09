import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NotificationManagerService } from '../../notification-manager/notification-manager.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { NotificationService } from '../../database/notification/notification.service';
import { NotificationReceiverEntity } from '../../database/entities/notification-receiver.entity';
import { NotificationReceiverDto } from '../../shared/dtos/notification-receiver.dto';

@Controller('notifications/')
export class NotificationsController {
  constructor(
    private notificationService: NotificationService,
    private notificationManager: NotificationManagerService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  public async trigger() {
    await this.notificationManager.poll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('notifier/')
  public async getAllReceiver(): Promise<NotificationReceiverEntity[]> {
    return this.notificationService.getAllReceiver();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('notifier/')
  public async createReceiver(@Body() dto: NotificationReceiverDto): Promise<NotificationReceiverEntity> {
    return this.notificationService.createReceiver(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('notifier/')
  public async updateReceiver(@Body() dto: NotificationReceiverDto): Promise<any> {
    return this.notificationService.updateReceiver(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('notifier/:id')
  public async deleteReceiver(@Param('id') id: number): Promise<any> {
    return this.notificationService.deleteReceiver(id);
  }
}
