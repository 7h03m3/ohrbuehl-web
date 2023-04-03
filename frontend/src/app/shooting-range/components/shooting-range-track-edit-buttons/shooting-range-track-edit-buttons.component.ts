import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';
import { ShootingRangeTrackEditDialogComponent } from '../shooting-range-track-edit-dialog/shooting-range-track-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { ShootingRangeTrackAssignmentDialogComponent } from '../shooting-range-track-assignment-dialog/shooting-range-track-assignment-dialog.component';

@Component({
  selector: 'app-shooting-range-track-edit-buttons',
  templateUrl: './shooting-range-track-edit-buttons.component.html',
  styleUrls: ['./shooting-range-track-edit-buttons.component.css'],
})
export class ShootingRangeTrackEditButtonsComponent {
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Input() organizations!: OrganizationDto[];
  @Input() prices!: ShootingRangePriceDto[];
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();

  private selectedTrackStart = 0;
  private selectedTrackEnd = 0;

  public constructor(private dialog: MatDialog) {}

  public onTrackEdit(element: ShootingRangeAccountingUnitDto) {
    const priceId = element.price.id == 0 ? '' : element.price.id;
    const organization = element.organization.id == 0 ? '' : element.organization.id;
    const dialogRef = this.dialog.open(ShootingRangeTrackEditDialogComponent, {
      data: {
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

  public openAssignmentDialog() {
    const dialogRef = this.dialog.open(ShootingRangeTrackAssignmentDialogComponent, {
      data: {
        trackStart: this.selectedTrackStart,
        trackEnd: this.selectedTrackEnd,
        priceId: '',
        organizationId: '',
        comment: '',
        organizationList: this.organizations,
        priceList: this.prices,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.trackStart != undefined) {
        const organization = this.organizations.filter((x) => x.id == data.organizationId)[0];
        const price = this.prices.filter((x) => x.id == data.priceId)[0];

        this.accountingData.items.forEach((element) => {
          if (element.track >= data.trackStart && element.track <= data.trackEnd) {
            element.organization = organization;
            element.price = price;
            element.comment = data.comment;
          }
        });

        this.accountingDataChange.emit(this.accountingData);
      }

      this.selectedTrackStart = 0;
      this.selectedTrackEnd = 0;
    });
  }

  public onTrackSelect(element: ShootingRangeAccountingUnitDto) {
    if (this.selectedTrackStart == 0) {
      this.selectedTrackStart = element.track;
    } else if (this.selectedTrackEnd == 0) {
      this.selectedTrackEnd = element.track;
    } else {
      this.selectedTrackStart = element.track;
      this.selectedTrackEnd = 0;
    }

    if (this.selectedTrackStart > this.selectedTrackEnd) {
      const end = this.selectedTrackEnd;
      this.selectedTrackEnd = this.selectedTrackStart;
      this.selectedTrackStart = end;
    }

    if (this.selectedTrackStart != 0 && this.selectedTrackEnd != 0) {
      this.openAssignmentDialog();
    }
  }

  public isTrackSelected(element: ShootingRangeAccountingUnitDto): boolean {
    const track = element.track;
    const start = this.selectedTrackStart;
    const end = this.selectedTrackEnd;
    if (start == track) {
      return true;
    }

    if (end == track) {
      return true;
    }

    return start != 0 && end != 0 && track > start && track < end;
  }

  public isTrackGap(isFirst: boolean, index: number) {
    if (isFirst) {
      return false;
    }

    const currentItem = this.accountingData.items[index];
    const lastItem = this.accountingData.items[index - 1];

    return currentItem.track != lastItem.track + 1;
  }

  public getTrackColor(element: ShootingRangeAccountingUnitDto): string {
    if (this.isTrackSelected(element)) {
      return 'orange';
    } else if (this.accountingData.id == 0) {
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
