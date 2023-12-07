import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ShootingRangeAccountingService } from '../../database/shooting-range-accounting/shooting-range-accounting.service';
import { AccountingItemsOrganizationPdfService } from '../../pdf/accounting-items-organization-pdf/accounting-items-organization-pdf.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private accounting: ShootingRangeAccountingService,
    private accountingOrganizationPdf: AccountingItemsOrganizationPdfService,
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
    await this.accountingOrganizationPdf.generatePdf(year, data, response);
  }
}
