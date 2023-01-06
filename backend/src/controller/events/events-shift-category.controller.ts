import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventsShiftCategoryService } from '../../database/events/events-shift-category.service';
import { EventShiftCategoryEntity } from '../../database/entities/event-shift-category.entity';
import { EventShiftCategoryCreateDto } from '../../shared/dtos/event-shift-category-create.dto';
import { EventShiftCategoryDto } from '../../shared/dtos/event-shift-category.dto';

@Controller('events/shift-category')
export class EventsShiftCategoryController {
  constructor(private categoryService: EventsShiftCategoryService) {}

  @Roles(Role.Admin, Role.EventOrganizer, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<EventShiftCategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Roles(Role.Admin, Role.EventOrganizer, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  getById(@Param('id') id: number): Promise<EventShiftCategoryEntity> {
    return this.categoryService.getById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: EventShiftCategoryCreateDto): Promise<EventShiftCategoryEntity> {
    return this.categoryService.create(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: EventShiftCategoryDto): Promise<EventShiftCategoryEntity> {
    return this.categoryService.update(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.categoryService.delete(id);
  }
}
