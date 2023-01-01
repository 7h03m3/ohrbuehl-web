import { Component, EventEmitter, Output } from '@angular/core';
import { InvoiceTypeEnum } from '../../../shared/enums/invoice-type.enum';
import { UserLocalData } from '../../../shared/classes/user-local-data';

@Component({
  selector: 'app-invoice-step-type-selection',
  templateUrl: './invoice-type-selection.component.html',
  styleUrls: ['./invoice-type-selection.component.css'],
})
export class InvoiceTypeSelectionComponent {
  public invoiceTypes = Object.values(InvoiceTypeEnum);
  public selectedType: InvoiceTypeEnum = InvoiceTypeEnum.Invoice_Custom;
  @Output() selectedTypeChange = new EventEmitter<InvoiceTypeEnum>();

  constructor(private userLocalData: UserLocalData) {}

  public getInvoiceTypeText(type: string): string {
    return this.userLocalData.convertInvoiceTypeText(type);
  }

  public onSubmit() {
    this.selectedTypeChange.emit(this.selectedType);
  }
}
