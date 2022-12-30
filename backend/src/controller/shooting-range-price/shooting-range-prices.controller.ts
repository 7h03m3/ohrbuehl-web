import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { ShootingRangePriceService } from '../../database/shooting-range-price/shooting-range-price.service';
import { ShootingRangePriceEntity } from '../../database/entities/shooting-range-price.entity';
import { ShootingRangePriceCreateDto } from '../../shared/dtos/shooting-range-price-create.dto';
import { ShootingRangePriceTypeEnum } from '../../shared/enums/shooting-range-price-type.enum';

@Controller('shooting-range-price')
export class ShootingRangePricesController {
  constructor(private readonly shootingRangePriceService: ShootingRangePriceService) {}

  @Get()
  getAll(): Promise<ShootingRangePriceEntity[]> {
    return this.shootingRangePriceService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<ShootingRangePriceEntity> {
    return this.shootingRangePriceService.findOne(id);
  }

  @Get('/byType/:type')
  getByType(@Param('type') type: ShootingRangePriceTypeEnum): Promise<ShootingRangePriceEntity[]> {
    return this.shootingRangePriceService.findByType(type);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() createDto: ShootingRangePriceCreateDto): Promise<ShootingRangePriceEntity> {
    return this.shootingRangePriceService.create(createDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() updateDto: ShootingRangePriceEntity): Promise<any> {
    return this.shootingRangePriceService.update(updateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.shootingRangePriceService.delete(id);
  }
}
