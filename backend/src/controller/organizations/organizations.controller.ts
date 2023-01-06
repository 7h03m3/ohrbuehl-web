import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { OrganizationsService } from '../../database/organizations/organizations.service';
import { OrganizationEntity } from '../../database/entities/organization.entity';
import { OrganizationCreateDto } from '../../shared/dtos/organization-create.dto';
import { OrganizationDto } from '../../shared/dtos/organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  getAll(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('detail')
  getAllDetail(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAllDetail();
  }

  @Get('native')
  getAllNative(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAllNative();
  }

  @Get('300m')
  getAll300m(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAll300m();
  }

  @Get('100m')
  getAll100m(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAll100m();
  }

  @Get('50m')
  getAll50m(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAll50m();
  }

  @Get('25m')
  getAll25m(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAll25m();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<OrganizationEntity> {
    return this.organizationsService.findOne(id);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/byManager/:id')
  getByManagerId(@Param('id') id: number): Promise<OrganizationEntity> {
    return this.organizationsService.findOneByManager(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/detail/:id')
  getDetailById(@Param('id') id: number): Promise<OrganizationEntity> {
    return this.organizationsService.findOneDetail(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() createDto: OrganizationCreateDto): Promise<OrganizationEntity> {
    return this.organizationsService.create(createDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() updateDto: OrganizationDto): Promise<any> {
    return this.organizationsService.update(updateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.organizationsService.delete(id);
  }
}
