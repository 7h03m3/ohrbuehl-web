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

@Controller('shooting-range-accounting')
export class ShootingRangeAccountingController {
  constructor(
    private readonly accountingService: ShootingRangeAccountingService,
    private accountingPdfService: ShootingRangeAccountingPdfService,
  ) {}

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  getAll(): Promise<ShootingRangeAccountingEntity[]> {
    return this.accountingService.findAll();
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number): Promise<ShootingRangeAccountingEntity> {
    const returnValue = await this.accountingService.findOne(id);

    this.sortItemsByTrack(returnValue.items);

    return returnValue;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() createDto: ShootingRangeAccountingCreateDto): Promise<ShootingRangeAccountingEntity> {
    return this.accountingService.create(createDto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: ShootingRangeAccountingDto): Promise<ShootingRangeAccountingEntity> {
    return this.accountingService.update(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.accountingService.delete(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('pdf/:id')
  async downloadReport(@Param('id') id: number, @Res() response): Promise<any> {
    const accountingData: ShootingRangeAccountingEntity = await this.getById(id);
    if (!accountingData) {
      const errorMessage = 'accounting data with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.accountingPdfService.generatePdf(accountingData, response);
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
