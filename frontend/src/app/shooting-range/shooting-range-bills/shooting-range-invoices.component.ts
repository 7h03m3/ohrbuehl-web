import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { MatStepper } from '@angular/material/stepper';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceTemplates } from '../../invoice/components/invoice-templates';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shooting-range-bills',
  templateUrl: './shooting-range-invoices.component.html',
  styleUrls: ['./shooting-range-invoices.component.css'],
})
export class ShootingRangeInvoicesComponent implements OnInit {
  public invoiceData: InvoiceDto = new InvoiceDto();
  public formTitle = 'Rechnung erstellen';
  public formValid = false;
  private templates = new InvoiceTemplates();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const invoiceId = Number(data.get('id'));
      if (!invoiceId) {
        this.invoiceData = this.templates.getEmpty();
      } else {
        this.apiService.getInvoice(invoiceId).subscribe((response) => {
          this.invoiceData = response;
          this.invoiceData.date = new Date().getTime();
        });
      }
    });
    this.formValid = true;
  }

  public onStepSubmit(stepper: MatStepper) {
    stepper.next();
  }

  public onSave() {
    if (this.invoiceData.id == 0) {
      const createDto = new InvoiceCreateDto();

      createDto.date = this.invoiceData.date;
      createDto.title = this.invoiceData.title;
      createDto.filename = this.invoiceData.filename;
      createDto.creditor = this.invoiceData.creditor;
      createDto.debtor = this.invoiceData.debtor;
      createDto.items = this.invoiceData.items;
      createDto.payed = this.invoiceData.payed;

      this.apiService.createInvoice(createDto).subscribe((result) => {
        this.showSnackBar(createDto.title);
      });
    } else {
      this.apiService.updateInvoice(this.invoiceData).subscribe((result) => {
        this.showSnackBar(this.invoiceData.title);
      });
    }
  }

  private showSnackBar(title: string) {
    const ref = this._snackBar.open('Rechnung "' + title + '" gespeichert', 'Schliessen', {
      duration: 2000,
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/shooting-range/invoice-list']);
    });
  }
}
