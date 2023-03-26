import { Component, Input, OnInit } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shooting-range-shot-number-table',
  templateUrl: './shot-number-table.component.html',
  styleUrls: ['./shot-number-table.component.css'],
})
export class ShotNumberTableComponent implements OnInit {
  @Input() accountingData!: ShootingRangeAccountingDto;

  public summaryDisplayedColumns: string[] = ['shots', 'shotPrice', 'organization', 'comment'];
  public displayedColumns: string[] = ['tracks', 'shots', 'shotPrice', 'organization', 'comment'];

  public constructor(private dialog: MatDialog) {}

  public ngOnInit(): void {}

  public getOrganizationText(accountingUnit: ShootingRangeAccountingUnitDto): string {
    if (accountingUnit == null) {
      return '';
    }

    if (accountingUnit.organization == null) {
      return '';
    }

    return accountingUnit.organization.name + ' (' + accountingUnit.organization.abbreviation + ')';
  }

  public getOrganizationColor(element: ShootingRangeAccountingUnitDto): string {
    let color = 'white';

    if (element.organization.id != 0) {
      color = element.organization.color;
    }

    return color;
  }
}
