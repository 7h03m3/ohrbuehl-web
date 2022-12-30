import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShotNumberBilling } from '../../shot-number-billing';
import { Organization } from '../../organization';

@Component({
  selector: 'app-shot-number-table',
  templateUrl: './shot-number-table.component.html',
  styleUrls: ['./shot-number-table.component.css'],
})
export class ShotNumberTableComponent implements OnInit {
  @Input() shotNumberBilling!: ShotNumberBilling;
  @Input() organizations!: Organization[];
  @Input() editDisabled = true;
  @Output() shotNumberBillingChange = new EventEmitter<ShotNumberBilling>();

  public displayedColumns: string[] = ['tracks', 'shots', 'shotPrice', 'organization'];

  constructor() {}

  ngOnInit(): void {}

  convertToFloat(event: any): number {
    return parseFloat(event.target.value);
  }

  getOrganizationText(organizationId: number): string {
    const found = this.organizations.find((element) => element.id == organizationId);

    if (found == undefined) {
      return '';
    }

    return found.fullName + ' (' + found.abbreviation + ')';
  }

  dataChanged() {
    this.shotNumberBillingChange.emit(this.shotNumberBilling);
  }
}
