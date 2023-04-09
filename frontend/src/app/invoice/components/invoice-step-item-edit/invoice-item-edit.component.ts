import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { NgForm } from '@angular/forms';
import { InvoiceItemDto } from '../../../shared/dtos/invoice-item.dto';
import { ApiService } from '../../../api/api.service';
import { InvoiceItemApi } from '../../../api/classes/invoice-item-api';

@Component({
  selector: 'app-invoice-step-item-edit',
  templateUrl: './invoice-item-edit.component.html',
  styleUrls: ['./invoice-item-edit.component.css'],
})
export class InvoiceItemEditComponent implements OnInit, OnChanges {
  @Input() invoiceData!: InvoiceDto;
  @Output() invoiceDataChange = new EventEmitter<InvoiceDto>();

  public invoiceItem: InvoiceItemDto = new InvoiceItemDto();
  dataValid = false;
  currencyString = ' SFr.';
  newInvoiceItemExpanded = true;
  displayedColumns: string[] = ['position', 'description', 'amount', 'price', 'total', 'action'];
  private invoiceItemApi: InvoiceItemApi;

  constructor(private apiService: ApiService) {
    this.invoiceItemApi = this.apiService.getInvoiceItem();
  }

  public ngOnInit(): void {
    this.initInvoiceItem();
    this.updateDataState();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateDataState();
  }

  public onSubmit() {
    this.invoiceDataChange.emit(this.invoiceData);
  }

  public onAddItem(form: NgForm) {
    if (form.valid) {
      this.invoiceItem.position = this.invoiceData.items.length + 1;

      if (this.isExistingInvoice()) {
        this.invoiceItem.invoiceId = this.invoiceData.id;
        this.invoiceItemApi.create(this.invoiceItem).subscribe((result) => {
          this.invoiceItem.id = result;
          this.invoiceData.items.push(this.invoiceItem);

          this.initInvoiceItem();
          this.refreshItemTable();
        });
      } else {
        this.invoiceData.items.push(this.invoiceItem);
        this.initInvoiceItem();
        this.refreshItemTable();
      }
    }
  }

  public onRemoveItem(index: number) {
    index -= 1;
    if (index > -1) {
      if (this.isExistingInvoice()) {
        const itemToDelete = this.invoiceData.items[index];
        this.invoiceItemApi.delete(itemToDelete.id).subscribe(() => {
          this.invoiceData.items.splice(index, 1);

          this.updateItemPositions();
          this.refreshItemTable();
        });
      } else {
        this.invoiceData.items.splice(index, 1);

        this.updateItemPositions();
        this.refreshItemTable();
      }
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

      if (this.isExistingInvoice()) {
        this.invoiceItemApi.update(value).subscribe();
      }
    });
  }

  private refreshItemTable() {
    this.refreshTable();
    this.updateDataState();
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

  private isExistingInvoice(): boolean {
    return this.invoiceData.id != 0;
  }
}
