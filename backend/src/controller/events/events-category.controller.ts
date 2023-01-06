import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventCategoryEntity } from '../../database/entities/event-category.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventCategoryCreateDto } from '../../shared/dtos/event-category-create.dto';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';
import { EventsCategoryService } from '../../database/events/events-category.service';

@Controller('events/category')
export class EventsCategoryController {
  constructor(private categoryService: EventsCategoryService) {}

  @Get()
  getAll(): Promise<EventCategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<EventCategoryEntity> {
    return this.categoryService.getById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: EventCategoryCreateDto): Promise<EventCategoryEntity> {
    return this.categoryService.create(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: EventCategoryDto): Promise<EventCategoryEntity> {
    return this.categoryService.update(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.categoryService.delete(id);
  }
}
