import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';

@Component({
  selector: 'app-shooting-range-shot-number-table',
  templateUrl: './shot-number-table.component.html',
  styleUrls: ['./shot-number-table.component.css'],
})
export class ShotNumberTableComponent implements OnInit {
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Input() summarizedAccountingData!: ShootingRangeAccountingDto;
  @Input() organizations!: OrganizationDto[];
  @Input() prices!: ShootingRangePriceDto[];
  @Input() editDisabled = true;
  @Input() editShots = false;
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();

  public summaryDisplayedColumns: string[] = ['shots', 'shotPrice', 'organization', 'comment'];
  public displayedColumns: string[] = ['tracks', 'shots', 'shotPrice', 'organization', 'comment'];

  public constructor() {}

  public ngOnInit(): void {}

  public getOrganizationText(accountingUnit: any): string {
    if (accountingUnit == null) {
      return '';
    }

    if (accountingUnit.organization == null) {
      return '';
    }

    return accountingUnit.organization.name + ' (' + accountingUnit.organization.abbreviation + ')';
  }

  public onPriceChange(element: ShootingRangeAccountingUnitDto, priceId: any) {
    const price = this.prices.filter((x) => x.id == priceId)[0];
    element.price = price;
    this.accountingDataChange.emit(this.accountingData);
  }

  public onOrganizationChange(element: ShootingRangeAccountingUnitDto, organizationId: any) {
    const organization = this.organizations.filter((x) => x.id == organizationId)[0];
    element.organization = organization;
    this.accountingDataChange.emit(this.accountingData);
  }

  public isSummary(): boolean {
    return !this.editShots && this.editDisabled;
  }

  public getBackgroundColor(): string {
    return 'red';
  }

  public getOrganizationColor(element: ShootingRangeAccountingUnitDto) {
    let color = 'white';

    if (element.organization.id != 0) {
      color = element.organization.color;
    }

    return color;
  }

  public isFilledIn(element: ShootingRangeAccountingUnitDto): boolean {
    if (this.editShots == true) {
      return true;
    }

    if (element.organization.id == 0) {
      return false;
    }

    if (element.price.id == 0) {
      return false;
    }

    return true;
  }
}
