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
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShootingRangeAccountingService } from '../../database/shooting-range-accounting/shooting-range-accounting.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { ShootingRangeAccountingCreateDto } from '../../shared/dtos/shooting-range-accounting-create.dto';
import { ShootingRangeAccountingEntity } from '../../database/entities/shooting-range-accounting.entity';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';
import { ShootingRangeAccountingDto } from '../../shared/dtos/shooting-range-accounting.dto';
import { ShootingRangeAccountingPdfService } from '../../pdf/accounting-pdf/shooting-range-accounting-pdf.service';
import { NotificationManagerService } from '../../notification-manager/notification-manager.service';
import { NotificationSource } from '../../shared/enums/notification-source.enum';
import { DateHelper } from '../../shared/classes/date-helper';

@Controller('shooting-range-accounting/')
export class ShootingRangeAccountingController {
  constructor(
    private readonly accountingService: ShootingRangeAccountingService,
    private accountingPdfService: ShootingRangeAccountingPdfService,
    private notificationManager: NotificationManagerService,
  ) {}

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('year/:year')
  public getAllByYear(@Param('year') year: number): Promise<ShootingRangeAccountingEntity[]> {
    console.log(year);
    return this.accountingService.findAllByYear(year);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/detail/:year')
  public getAllDetailed(@Param('year') year: number): Promise<ShootingRangeAccountingEntity[]> {
    return this.accountingService.findAllDetailed(year);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  public async getById(@Param('id') id: number): Promise<ShootingRangeAccountingEntity> {
    const returnValue = await this.accountingService.findOne(id);

    this.sortItemsByTrack(returnValue.items);

    return returnValue;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async create(@Body() createDto: ShootingRangeAccountingCreateDto): Promise<ShootingRangeAccountingEntity> {
    const newEntity = await this.accountingService.create(createDto);

    await this.notificationManager.addEvent(NotificationSource.ShootingRangeAccounting, newEntity.id);

    return newEntity;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: ShootingRangeAccountingDto): Promise<ShootingRangeAccountingEntity> {
    const updateEntity = await this.accountingService.update(dto);

    await this.notificationManager.updateEvent(NotificationSource.ShootingRangeAccounting, updateEntity.id);

    return updateEntity;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    const deletedEntity = await this.accountingService.findOne(id);

    const returnValue = this.accountingService.delete(id);

    const deleteComment = DateHelper.getStartEndDateString(deletedEntity.start, deletedEntity.end);
    await this.notificationManager.deleteEvent(NotificationSource.ShootingRangeAccounting, id, deleteComment);

    return returnValue;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('pdf/:id')
  public async downloadReport(@Param('id') id: number, @Res() response): Promise<any> {
    const accountingData: ShootingRangeAccountingEntity = await this.getById(id);
    if (!accountingData) {
      const errorMessage = 'accounting data with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const pdfFile = await this.accountingPdfService.generatePdf(accountingData);
    await pdfFile.addDataToResponse(response);
  }

  private sortItemsByTrack(items: ShootingRangeAccountingUnitEntity[]) {
    items = items.sort((n1, n2) => {
      if (n1.track > n2.track) {
        return 1;
      }

      if (n1.track < n2.track) {
        return -1;
      }

      return 0;
    });
  }
}
