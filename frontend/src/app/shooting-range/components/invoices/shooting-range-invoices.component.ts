import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { InvoiceCreateDto } from '../../../shared/dtos/invoice-create.dto';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceTemplates } from '../../../invoice/components/invoice-templates';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceApi } from '../../../api/invoice-api';
import { InvoiceTypeEnum } from '../../../shared/enums/invoice-type.enum';
import { InvoiceItemEditComponent } from '../../../invoice/components/invoice-step-item-edit/invoice-item-edit.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './shooting-range-invoices.component.html',
  styleUrls: ['./shooting-range-invoices.component.css'],
})
export class ShootingRangeInvoicesComponent implements OnInit {
  public invoiceData: InvoiceDto = new InvoiceDto();
  public invoiceType: InvoiceTypeEnum = InvoiceTypeEnum.Invoice_Custom;
  public formTitle = 'Rechnung erstellen';
  public formValid = false;
  public stepEnableTypeSelection = false;
  public stepEnableInformation = false;
  public stepEnableAccountingSelection = false;
  public stepEnableAccountingTimeRangeSelection = false;
  public stepEnableAccountingMilitary = false;
  public stepEnableItemEdit = false;
  public stepEnableCheck = false;
  private invoiceItemEditComponent: any;
  private templates = new InvoiceTemplates();

  constructor(
    private invoiceApi: InvoiceApi,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
  ) {}

  @ViewChild(InvoiceItemEditComponent)
  set appShark(child: InvoiceItemEditComponent) {
    this.invoiceItemEditComponent = child;
  }

  ngOnInit(): void {
    this.disableAllSteps();

    this.route.paramMap.subscribe((data) => {
      const invoiceId = Number(data.get('id'));
      if (!invoiceId) {
        this.stepEnableTypeSelection = true;
        this.invoiceData = this.templates.getEmpty();
      } else {
        this.stepEnableInformation = true;
        this.stepEnableItemEdit = true;
        this.stepEnableCheck = true;
        this.formTitle = 'Rechnung bearbeiten';
        this.invoiceApi.getById(invoiceId).subscribe((response) => {
          this.invoiceData = response;
          this.invoiceData.date = new Date().getTime();
        });
      }
    });
    this.formValid = true;
  }

  public onInvoiceTypeChange(stepper: MatStepper, invoiceType: string) {
    this.invoiceType = invoiceType as unknown as InvoiceTypeEnum;
    this.disableAllSteps();
    this.stepEnableTypeSelection = true;

    switch (this.invoiceType) {
      default:
        break;
      case InvoiceTypeEnum.Invoice_Custom:
        this.stepEnableInformation = true;
        this.stepEnableItemEdit = true;
        this.stepEnableCheck = true;
        break;
      case InvoiceTypeEnum.Invoice_Shooting_Range_Accounting_Daily:
        this.stepEnableAccountingSelection = true;
        this.stepEnableInformation = true;
        this.stepEnableItemEdit = true;
        this.stepEnableCheck = true;
        break;

      case InvoiceTypeEnum.Invoice_Shooting_Range_Accounting_Time_Range:
        this.stepEnableAccountingTimeRangeSelection = true;
        this.stepEnableInformation = true;
        this.stepEnableItemEdit = true;
        this.stepEnableCheck = true;
        break;

      case InvoiceTypeEnum.Invoice_Shooting_Range_Accounting_Military_25_50_100m:
        this.stepEnableAccountingMilitary = true;
        this.stepEnableInformation = true;
        this.stepEnableItemEdit = true;
        this.stepEnableCheck = true;
        break;
    }

    this.changeDetector.detectChanges();
    stepper.next();
  }

  public onStepSubmit(stepper: MatStepper) {
    this.invoiceItemEditComponent.ngOnChanges();
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

      this.invoiceApi.create(createDto).subscribe((result) => {
        this.showSnackBar(createDto.title);
      });
    } else {
      this.invoiceApi.update(this.invoiceData).subscribe((result) => {
        this.showSnackBar(this.invoiceData.title);
      });
    }
  }

  private disableAllSteps() {
    this.stepEnableTypeSelection = false;
    this.stepEnableInformation = false;
    this.stepEnableItemEdit = false;
    this.stepEnableCheck = false;
    this.stepEnableAccountingMilitary = false;
    this.stepEnableAccountingSelection = false;
    this.stepEnableAccountingTimeRangeSelection = false;
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
