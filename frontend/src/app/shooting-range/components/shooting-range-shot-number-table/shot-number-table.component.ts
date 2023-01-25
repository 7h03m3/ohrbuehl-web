import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';
import { MatDialog } from '@angular/material/dialog';
import { ShootingRangeEditTrackDialogComponent } from './shooting-range-edit-track-dialog/shooting-range-edit-track-dialog.component';

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

  public constructor(private dialog: MatDialog) {}

  public ngOnInit(): void {}

  public onTrackEdit(element: ShootingRangeAccountingUnitDto) {
    const priceId = element.price.id == 0 ? '' : element.price.id;
    const organization = element.organization.id == 0 ? '' : element.organization.id;
    const dialogRef = this.dialog.open(ShootingRangeEditTrackDialogComponent, {
      data: {
        editShots: this.editShots,
        track: element.track,
        amount: element.amount,
        priceId: priceId,
        organizationId: organization,
        comment: element.comment,
        organizationList: this.organizations,
        priceList: this.prices,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.track != undefined) {
        const organization = this.organizations.filter((x) => x.id == data.organizationId)[0];
        const price = this.prices.filter((x) => x.id == data.priceId)[0];

        element.organization = organization;
        element.price = price;
        element.comment = data.comment;
        element.amount = data.amount;

        this.accountingDataChange.emit(this.accountingData);
      }
    });
  }

  public isTrackGap(isFirst: boolean, index: number) {
    if (isFirst) {
      return false;
    }

    const currentItem = this.accountingData.items[index];
    const lastItem = this.accountingData.items[index - 1];

    return currentItem.track != lastItem.track + 1;
  }

  public getOrganizationText(accountingUnit: ShootingRangeAccountingUnitDto): string {
    if (accountingUnit == null) {
      return '';
    }

    if (accountingUnit.organization == null) {
      return '';
    }

    return accountingUnit.organization.name + ' (' + accountingUnit.organization.abbreviation + ')';
  }

  public getTrackColor(element: ShootingRangeAccountingUnitDto): string {
    if (!this.editDisabled && this.accountingData.id == 0) {
      return this.isFilledIn(element) ? 'green' : 'red';
    } else {
      return this.isFilledIn(element) ? this.getOrganizationColor(element) : '';
    }
  }

  public getTrackTooltip(element: ShootingRangeAccountingUnitDto): string {
    if (this.isFilledIn(element)) {
      return (
        'Scheibe ' +
        element.track +
        ' - ' +
        element.organization.abbreviation +
        ' - Preis ' +
        element.price.name +
        ' - ' +
        element.amount +
        ' Schuss'
      );
    } else {
      return 'Scheibe ' + element.track + ' - ' + element.amount + ' Schuss';
    }
  }

  public getOrganizationColor(element: ShootingRangeAccountingUnitDto): string {
    let color = 'white';

    if (element.organization.id != 0) {
      color = element.organization.color;
    }

    return color;
  }

  public isFilledIn(element: ShootingRangeAccountingUnitDto): boolean {
    if (element.organization.id == 0) {
      return false;
    }

    if (element.price.id == 0) {
      return false;
    }

    return true;
  }
}
