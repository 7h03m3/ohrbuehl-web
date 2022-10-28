import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {InvoiceDto} from "../../../../shared/dtos/invoice.dto";

@Component({
  selector: 'app-invoice-information',
  templateUrl: './invoice-information.component.html',
  styleUrls: ['./invoice-information.component.css']
})
export class InvoiceInformationComponent implements OnInit {
  @Input() invoiceData!: InvoiceDto;
  @Output() invoiceDataChange = new EventEmitter<InvoiceDto>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.invoiceDataChange.emit(this.invoiceData);
  }
}
