import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { OrganizationMemberService } from '../../database/organizations/organization-member.service';
import { OrganizationMemberEntity } from '../../database/entities/organization-member.entity';
import { OrganizationMemberCreateDto } from '../../shared/dtos/organization-member-create.dto';
import { OrganizationMemberDto } from '../../shared/dtos/organization-member.dto';
import { OrganizationsService } from '../../database/organizations/organizations.service';
import { EventsShiftService } from '../../database/events/events-shift.service';
import { EventsStaffPoolService } from '../../database/events/events-staff-pool.service';
import { UsersService } from '../../database/users/users.service';

@Controller('organizations/member')
export class OrganizationsMemberController {
  constructor(
    private memberService: OrganizationMemberService,
    private organizationService: OrganizationsService,
    private eventShiftService: EventsShiftService,
    private eventStaffPoolService: EventsStaffPoolService,
    private userService: UsersService,
  ) {}

  private static throwForbidden(req: any) {
    const errorMessage = 'not allowed to access organization with user id ' + req.user.id;
    throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  public getAll(): Promise<OrganizationMemberEntity[]> {
    return this.memberService.findAll();
  }

  @Roles(Role.Admin, Role.OrganizationManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/byOrganization/:id')
  public async getAllByOrganization(@Param('id') id: number, @Request() req: any): Promise<OrganizationMemberEntity[]> {
    await this.checkAccessByOrganization(id, req);
    return this.memberService.findAllByOrganizationId(id);
  }

  @Roles(Role.Admin, Role.OrganizationManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/byOrganizationDetailed/:id')
  public async getAllWithShiftsByOrganization(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<OrganizationMemberEntity[]> {
    await this.checkAccessByOrganization(id, req);
    return this.memberService.findAllDetailedByOrganizationId(id);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  public async getById(@Param('id') id: number, @Request() req: any): Promise<OrganizationMemberEntity> {
    await this.checkAccessById(+id, req);
    return this.memberService.getById(id);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async create(
    @Body() dto: OrganizationMemberCreateDto,
    @Request() req: any,
  ): Promise<OrganizationMemberEntity> {
    await this.checkAccessByOrganization(dto.organizationId, req);
    return this.memberService.create(dto);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: OrganizationMemberDto, @Request() req: any): Promise<OrganizationMemberEntity> {
    await this.checkAccessByOrganization(dto.organizationId, req);
    return this.memberService.update(dto);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Request() req: any): Promise<any> {
    await this.checkAccessById(+id, req);
    await this.eventStaffPoolService.deleteByMemberId(+id);
    await this.eventShiftService.clearAllAssignments(+id);
    return this.memberService.delete(id);
  }

  private async checkAccessById(id: number, req: any) {
    if (req.user.roles != Role.OrganizationManager) {
      return;
    }

    const member = await this.memberService.getDetailById(id);

    await this.checkAccessByOrganization(member.organizationId, req);
  }

  private async checkAccessByOrganization(organizationId: number, req: any) {
    if (req.user.roles != Role.OrganizationManager) {
      return;
    }

    const user = await this.userService.findOne(req.user.id);

    if (user == null || user.assignedOrganizationId != organizationId) {
      OrganizationsMemberController.throwForbidden(req);
    }
  }
}
