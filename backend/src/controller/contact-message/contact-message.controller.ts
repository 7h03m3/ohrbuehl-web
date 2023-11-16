import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ContactMessageService } from '../../database/contact-message/contact-message.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { ContactMessageEntity } from '../../database/entities/contact-message.entity';
import { ContactMessageDto } from '../../shared/dtos/contact-message.dto';
import { ContactMessageStatus } from '../../shared/enums/contact-message-status.enum';

@Controller('contact-message/')
export class ContactMessageController {
  constructor(private contactMessages: ContactMessageService) {}

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('')
  public async getAll(): Promise<ContactMessageEntity[]> {
    return this.contactMessages.getAll();
  }

  @Post()
  public async add(@Body() dto: ContactMessageDto): Promise<ContactMessageEntity> {
    return this.contactMessages.add(dto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    return this.contactMessages.delete(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('status/')
  public async setStatus(@Body() dto: ContactMessageDto): Promise<any> {
    return this.contactMessages.setStatus(dto.id, dto.status);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('status/count/:status')
  public async getStatusCount(@Param('status') status: ContactMessageStatus): Promise<number> {
    return this.contactMessages.getStatusCount(status);
  }
}
