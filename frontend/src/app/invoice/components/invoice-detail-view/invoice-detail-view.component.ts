import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';

@Component({
  selector: 'app-invoice-detail-view',
  templateUrl: './invoice-detail-view.component.html',
  styleUrls: ['./invoice-detail-view.component.css'],
})
export class InvoiceDetailViewComponent implements OnInit {
  @Input() invoiceData!: InvoiceDto;

  public showDebtor = true;
  displayedColumns: string[] = ['position', 'description', 'amount', 'price', 'total'];
  currencyString = ' SFr.';

  ngOnInit(): void {
    this.updateShowDebtor();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateShowDebtor();
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

  private updateShowDebtor() {
    this.showDebtor = this.invoiceData.debtor && this.invoiceData.debtor.name != '';
  }
}
