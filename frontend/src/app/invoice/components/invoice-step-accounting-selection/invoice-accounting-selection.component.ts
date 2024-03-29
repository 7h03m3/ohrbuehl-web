import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { AccountingApi } from '../../../api/classes/accounting-api';
import { ApiService } from '../../../api/api.service';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { StringHelper } from '../../../shared/classes/string-helper';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { InvoiceItemDto } from '../../../shared/dtos/invoice-item.dto';
import { InvoiceItemHelper } from '../../classes/invoice-item-helper';

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

  constructor(private apiService: ApiService, private userData: UserLocalData) {
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

    this.invoiceData.title =
      'Schussgeld ' +
      organization.name +
      ' ' +
      StringHelper.getStartEndDateTimeString(this.accountingData.start, this.accountingData.end);
    this.invoiceData.items = new Array<InvoiceItemDto>();

    InvoiceItemHelper.addAccountingUnitsByOrganization(
      organization.id,
      this.accountingData.items,
      this.invoiceData.items,
    );

    this.invoiceDataChange.emit(this.invoiceData);
  }

  public getDateTimeString(element: ShootingRangeAccountingDto): string {
    return StringHelper.getStartEndDateTimeString(element.start, element.end);
  }

  public getTypeString(typeString: string): string {
    return this.userData.convertAccountingTypeText(typeString);
  }
}
