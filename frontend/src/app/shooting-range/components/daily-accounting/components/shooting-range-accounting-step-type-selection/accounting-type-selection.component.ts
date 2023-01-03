import { Component, EventEmitter, Output } from '@angular/core';
import { UserLocalData } from '../../../../../shared/classes/user-local-data';
import { ShootingRangeAccountingSelectionTypeEnum } from '../../../../../shared/enums/shooting-range-accounting-selection-type.enum';

@Component({
  selector: 'app-shooting-range-accounting-step-type-selection',
  templateUrl: './accounting-type-selection.component.html',
  styleUrls: ['./accounting-type-selection.component.css'],
})
export class AccountingTypeSelectionComponent {
  public accountingTypes = Object.values(ShootingRangeAccountingSelectionTypeEnum);
  public selectedType: ShootingRangeAccountingSelectionTypeEnum =
    ShootingRangeAccountingSelectionTypeEnum.Section_300m_SIUS_file;
  @Output() selectedTypeChange = new EventEmitter<ShootingRangeAccountingSelectionTypeEnum>();

  constructor(private userLocalData: UserLocalData) {}

  public onSubmit() {
    this.selectedTypeChange.emit(this.selectedType);
  }

  public getAccountingTypeText(type: string): string {
    return this.userLocalData.convertAccountingSelectionTypeText(type);
  }
}
