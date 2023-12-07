import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Role } from '../../shared/enums/role.enum';
import { UsersService } from '../../database/users/users.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { OrganizationFeatureService } from '../../database/organizations/organization-feature.service';
import { OrganizationFeatureEntity } from '../../database/entities/organization-feature.entity';
import { OrganizationFeatureDto } from '../../shared/dtos/organization-feature.dto';

@Controller('organizations/feature/')
export class OrganizationsFeaturesController {
  constructor(private userService: UsersService, private featureService: OrganizationFeatureService) {}

  private static throwForbidden(req: any) {
    const errorMessage = 'not allowed to access organization with user id ' + req.user.id;
    throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list')
  public getAll(): Promise<OrganizationFeatureEntity[]> {
    return this.featureService.findAll();
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/:id')
  public async getAllWithShiftsByOrganization(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<OrganizationFeatureEntity> {
    await this.checkAccessByOrganization(id, req);
    return this.featureService.findOneByOrganization(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async create(@Body() dto: OrganizationFeatureDto, @Request() req: any): Promise<OrganizationFeatureEntity> {
    return this.featureService.add(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: OrganizationFeatureDto, @Request() req: any): Promise<OrganizationFeatureEntity> {
    return this.featureService.update(dto);
  }

  private async checkAccessByOrganization(organizationId: number, req: any) {
    if (req.user.roles == Role.Admin) {
      return;
    }

    const user = await this.userService.findOne(req.user.id);

    if (user == null || user.assignedOrganizationId != organizationId) {
      OrganizationsFeaturesController.throwForbidden(req);
    }
  }
}
