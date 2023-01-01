import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { AccountingApi } from '../../../api/classes/accounting-api';
import { ApiService } from '../../../api/api.service';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { StringHelper } from '../../../shared/classes/string-helper';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { InvoiceItemDto } from '../../../shared/dtos/invoice-item.dto';

@Component({
  selector: 'app-invoice-step-accounting-selection',
  templateUrl: './invoice-accounting-selection.component.html',
  styleUrls: ['./invoice-accounting-selection.component.css'],
})
export class InvoiceAccountingSelectionComponent {
  @Input() invoiceData!: InvoiceDto;
  @Output() invoiceDataChange = new EventEmitter<InvoiceDto>();

  public accountingList: ShootingRangeAccountingDto[] = new Array<ShootingRangeAccountingDto>();
  public accountingData: ShootingRangeAccountingDto = new ShootingRangeAccountingDto();
  public selectedAccounting = '';
  public organizationMap = new Map<number, OrganizationDto>();
  public selectedOrganization = '';
  public disableOrganization = true;
  public disableSubmitButton = true;
  private accountingApi: AccountingApi;

  constructor(private apiService: ApiService, private userData: UserLocalData, private stringHelper: StringHelper) {
    this.accountingApi = this.apiService.getAccounting();
  }

  ngOnInit(): void {
    this.disableOrganization = true;
    this.disableSubmitButton = true;

    this.organizationMap.clear();

    this.accountingApi.getList().subscribe((response) => {
      this.accountingList = response;
    });
  }

  public onAccountingChange() {
    this.disableOrganization = true;
    this.disableSubmitButton = true;
    this.accountingApi.getById(+this.selectedAccounting).subscribe((response) => {
      this.organizationMap.clear();
      this.accountingData = response;
      this.accountingData.items.forEach((item) => {
        this.organizationMap.set(item.organization.id, item.organization);
      });

      this.disableOrganization = this.organizationMap.size == 0;
    });
  }

  public onOrganizationChange() {
    this.disableSubmitButton = false;
  }

  public onSubmit() {
    const organization = this.organizationMap.get(+this.selectedOrganization);

    if (organization == undefined) {
      this.disableSubmitButton = true;
      return;
    }

    const accountingDataString = this.stringHelper.getDateString(+this.accountingData.date);
    this.invoiceData.title =
      'Schussgeld ' +
      organization.name +
      ' ' +
      accountingDataString +
      ' ' +
      this.accountingData.startTime +
      ' - ' +
      this.accountingData.endTime;
    this.invoiceData.items = new Array<InvoiceItemDto>();

    this.accountingData.items.forEach((item) => {
      if (item.organization.id == organization.id) {
        const invoiceItem = new InvoiceItemDto();
        invoiceItem.description = 'Scheibe ' + item.track + ' (Preiskategorie: ' + item.price.name + ')';
        invoiceItem.price = item.price.price;
        invoiceItem.amount = item.amount;
        invoiceItem.position = this.invoiceData.items.length + 1;
        this.invoiceData.items.push(invoiceItem);
      }
    });

    this.invoiceDataChange.emit(this.invoiceData);
  }

  public getDateString(dateNumber: number): string {
    return this.stringHelper.getDateString(Number(dateNumber));
  }

  public getTypeString(typeString: string): string {
    return this.userData.convertAccountingTypeText(typeString);
  }
}
