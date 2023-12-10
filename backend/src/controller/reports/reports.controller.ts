import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ShootingRangeAccountingService } from '../../database/shooting-range-accounting/shooting-range-accounting.service';
import { AccountingItemsOrganizationPdfService } from '../../pdf/accounting-items-organization-pdf/accounting-items-organization-pdf.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { BusinessHoursService } from '../../database/business-hours/business-hours.service';
import { BusinessHourDayPdfService } from '../../pdf/business-hour-day-pdf/business-hour-day-pdf.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private accounting: ShootingRangeAccountingService,
    private accountingOrganizationPdf: AccountingItemsOrganizationPdfService,
    private businessHour: BusinessHoursService,
    private businessHourDayPdf: BusinessHourDayPdfService,
  ) {}

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('shooting-range-accounting/:year/:organization')
  public async getShootingRangeAccountingByOrganization(
    @Param('year') year: number,
    @Param('organization') organization: number,
    @Res() response: any,
  ) {
    const data = await this.accounting.findAllItemsByYearAndOrganization(year, organization);
    if (data) {
      await this.accountingOrganizationPdf.generatePdf(year, data, response);
    }
  }

  @Roles(Role.Admin, Role.ShootingRangeManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('business-hour/:id')
  public async getBusinessHourDayReport(@Param('id') id: number, @Res() response: any) {
    const data = await this.businessHour.getByIdDetails(id);
    if (data) {
      await this.businessHourDayPdf.generatePdf(data, response);
    }
  }
}
