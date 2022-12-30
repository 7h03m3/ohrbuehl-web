import { Component, EventEmitter, Output } from '@angular/core';
import { ShootingRangeAccountingTypeEnum } from '../../../../../shared/enums/shooting-range-accounting-type.enum';
import { UserLocalData } from '../../../../../shared/classes/user-local-data';

@Component({
  selector: 'app-accounting-type-selection',
  templateUrl: './accounting-type-selection.component.html',
  styleUrls: ['./accounting-type-selection.component.css'],
})
export class AccountingTypeSelectionComponent {
  public accountingTypes = Object.values(ShootingRangeAccountingTypeEnum);
  public selectedType: ShootingRangeAccountingTypeEnum = ShootingRangeAccountingTypeEnum.Section_300m;
  @Output() selectedTypeChange = new EventEmitter<ShootingRangeAccountingTypeEnum>();

  constructor(private userLocalData: UserLocalData) {}

  public onSubmit() {
    this.selectedTypeChange.emit(this.selectedType);
  }

  public getAccountingTypeText(type: string): string {
    return this.userLocalData.convertAccountingTypeText(type);
  }
}
