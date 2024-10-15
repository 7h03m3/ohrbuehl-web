import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { ApplicationDto } from '../../shared/dtos/application.dto';
import { DeleteResult } from 'typeorm';
import { ApplicationsService } from '../../database/applications/applications.service';
import { ApplicationEntity } from '../../database/entities/application.entity';
import { ApplicationFilesService } from '../../database/applications/application-files.service';
import { ApplicationState } from '../../shared/enums/appliaction-state.enum';
import { ApplicationSheetPdfService } from '../../pdf/application-sheet-pdf/application-sheet-pdf.service';
import { NotificationManagerService } from '../../notification-manager/notification-manager.service';

@Controller('application-admin')
export class ApplicationAdminController {
  constructor(
    private applicationService: ApplicationsService,
    private fileService: ApplicationFilesService,
    private pdfService: ApplicationSheetPdfService,
    private notificationService: NotificationManagerService,
  ) {}

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  public async getAll(): Promise<ApplicationDto[]> {
    return this.applicationService.getAll();
  }

  @Put()
  public async update(@Body() dto: ApplicationDto) {
    let entity = await this.getEntityById(dto.id);
    entity.fillFromDto(dto);

    entity = await this.applicationService.update(entity);
    entity.files = await this.fileService.getByApplicationId(entity);
    return entity;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/count')
  public async getCount(): Promise<number> {
    return this.applicationService.countNotAccepted();
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('/state/')
  public async setState(@Body() dto: ApplicationDto): Promise<any> {
    const entity = await this.getEntityById(+dto.id);

    entity.state = dto.state;
    entity.comment = dto.comment;

    if (entity.state == ApplicationState.Rejected) {
      entity.dates.expiration = ApplicationsService.getExpirationDate();
    }

    const returnValue = await this.applicationService.update(entity);

    this.notificationService.updateApplication(returnValue);
    return returnValue;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  public async geById(@Param('id') id: number): Promise<ApplicationDto> {
    const entity = await this.applicationService.getById(id);

    if (entity == null) {
      throw new NotFoundException('application with id ' + id + ' not found');
    }

    const dto = ApplicationEntity.getDto(entity);
    dto.files = await this.fileService.getByApplicationId(entity);
    return dto;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<DeleteResult> {
    const entity = await this.getEntityById(+id);
    await this.fileService.deleteAll(entity);
    const result = this.applicationService.delete(entity);

    this.notificationService.deleteApplication(entity);
    return result;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/file/:id')
  public async downloadFile(@Param('id') id: number, @Res() response: any) {
    return await this.fileService.download(id, response);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/sheet/:id')
  public async downloadSheet(@Param('id') id: number, @Res() response: any) {
    const entity = await this.getEntityById(id);
    return await this.pdfService.generatePdf(entity, response);
  }

  private async getEntityById(id: number): Promise<ApplicationEntity> {
    const entity = await this.applicationService.getById(+id);

    if (entity == null) {
      throw new BadRequestException('application with id ' + id + ' does not exist');
    }

    return entity;
  }
}
