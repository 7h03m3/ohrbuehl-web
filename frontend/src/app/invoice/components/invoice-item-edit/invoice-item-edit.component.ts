import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { NgForm } from '@angular/forms';
import { InvoiceItemDto } from '../../../shared/dtos/invoice-item.dto';

@Component({
  selector: 'app-invoice-item-edit',
  templateUrl: './invoice-item-edit.component.html',
  styleUrls: ['./invoice-item-edit.component.css'],
})
export class InvoiceItemEditComponent implements OnInit {
  @Input() invoiceData!: InvoiceDto;
  @Output() invoiceDataChange = new EventEmitter<InvoiceDto>();

  public invoiceItem: InvoiceItemDto = new InvoiceItemDto();

  dataValid = false;
  currencyString = ' SFr.';
  newInvoiceItemExpanded = true;
  displayedColumns: string[] = ['position', 'description', 'amount', 'price', 'total', 'action'];

  constructor() {}

  public ngOnInit(): void {
    this.initInvoiceItem();
    this.updateDataState();
  }

  public onSubmit() {
    this.invoiceDataChange.emit(this.invoiceData);
  }

  public onAddItem(form: NgForm) {
    if (form.valid) {
      this.invoiceItem.position = this.invoiceData.items.length + 1;
      this.invoiceData.items.push(this.invoiceItem);

      this.refreshTable();
      this.initInvoiceItem();
      this.updateDataState();
    }
  }

  public onRemoveItem(index: number) {
    index -= 1;
    if (index > -1) {
      this.invoiceData.items.splice(index, 1);

      this.updateItemPositions();
      this.refreshTable();
      this.updateDataState();
    }
  }

  public getTotalCost(): number {
    let totalCost = 0;
    this.invoiceData.items.forEach((value) => {
      totalCost += value.amount * value.price;
    });

    return totalCost;
  }

  public getCostString(price: number): string {
    return (
      price.toLocaleString('de-CH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      }) +
      ' ' +
      this.currencyString
    );
  }

  private updateItemPositions() {
    this.invoiceData.items.forEach((value, index) => {
      value.position = index + 1;
    });
  }

  private updateDataState() {
    this.dataValid = this.invoiceData.items.length != 0 && this.getTotalCost() > 0;
    this.newInvoiceItemExpanded = this.invoiceData.items.length == 0;
  }

  private refreshTable() {
    const newData = [...this.invoiceData.items];
    this.invoiceData.items = newData;
  }

  private initInvoiceItem() {
    this.invoiceItem = new InvoiceItemDto();
    this.invoiceItem.amount = 1;
    this.invoiceItem.price = 0.05;
  }
}
