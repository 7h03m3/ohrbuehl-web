import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { BulletPriceService } from '../../database/bullet-price/bullet-price.service';
import { BulletPriceEntity } from '../../database/entities/bullet-price.entity';
import { BulletPriceCreateDto } from '../../shared/dtos/bullet-price-create.dto';

@Controller('bullet-prices')
export class BulletPricesController {
  constructor(private readonly bulletPriceService: BulletPriceService) {}

  @Get()
  getAll(): Promise<BulletPriceEntity[]> {
    return this.bulletPriceService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<BulletPriceEntity> {
    return this.bulletPriceService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() createDto: BulletPriceCreateDto): Promise<BulletPriceEntity> {
    return this.bulletPriceService.create(createDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() updateDto: BulletPriceEntity): Promise<any> {
    return this.bulletPriceService.update(updateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.bulletPriceService.delete(id);
  }
}
