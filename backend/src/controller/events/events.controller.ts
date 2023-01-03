import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from '../../database/events/events.service';
import { EventCategoryEntity } from '../../database/entities/event-category.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventCategoryCreateDto } from '../../shared/dtos/event-category-create.dto';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('category')
  getAllCategories(): Promise<EventCategoryEntity[]> {
    return this.eventService.findAllCategories();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async createCategory(@Body() dto: EventCategoryCreateDto): Promise<EventCategoryEntity> {
    return this.eventService.createCategory(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async updateCategory(@Body() dto: EventCategoryDto): Promise<EventCategoryEntity> {
    return this.eventService.updateCategory(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<any> {
    return this.eventService.deleteCategory(id);
  }
}
