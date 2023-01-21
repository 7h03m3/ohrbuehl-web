import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { InvoiceItemDto } from '../../../shared/dtos/invoice-item.dto';
import { StringHelper } from '../../../shared/classes/string-helper';

@Component({
  selector: 'app-invoice-step-accounting-military',
  templateUrl: './invoice-step-accounting-military.component.html',
  styleUrls: ['./invoice-step-accounting-military.component.css'],
})
export class InvoiceStepAccountingMilitaryComponent {
  public militaryForm: UntypedFormGroup = new UntypedFormGroup({});

  @Input() invoiceData!: InvoiceDto;
  @Output() invoiceDataChange = new EventEmitter<InvoiceDto>();

  constructor(private formBuilder: UntypedFormBuilder, private stringHelper: StringHelper) {}

  ngOnInit(): void {
    this.militaryForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      shots: ['0', [Validators.min(1)]],
    });
  }

  public onSubmit() {
    const date = Date.parse(this.militaryForm.controls['date'].value);
    const dateString = this.stringHelper.getDateString(+date);
    this.invoiceData.title =
      'Schussgeld Militär 25m/50m/100m' +
      ' ' +
      dateString +
      ' ' +
      this.militaryForm.controls['startTime'].value +
      ' - ' +
      this.militaryForm.controls['endTime'].value;

    this.invoiceData.items = new Array<InvoiceItemDto>();

    const invoiceItem = new InvoiceItemDto();
    invoiceItem.description = 'Schussgeld (Preiskategorie: Militär)';
    invoiceItem.price = 0.25;
    invoiceItem.amount = +this.militaryForm.controls['shots'].value;
    invoiceItem.position = this.invoiceData.items.length + 1;
    this.invoiceData.items.push(invoiceItem);

    this.invoiceDataChange.emit(this.invoiceData);
  }
}
