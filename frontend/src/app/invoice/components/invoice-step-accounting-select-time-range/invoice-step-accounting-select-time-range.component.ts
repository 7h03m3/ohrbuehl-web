import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { AccountingApi } from '../../../api/accounting-api';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { SortHelper } from '../../../shared/classes/sort-helper';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { InvoiceItemDto } from '../../../shared/dtos/invoice-item.dto';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';
import { InvoiceItemHelper } from '../../classes/invoice-item-helper';
import { StringHelper } from '../../../shared/classes/string-helper';
import { UserLocalData } from '../../../shared/classes/user-local-data';

@Component({
  selector: 'app-invoice-step-accounting-select-time-range',
  templateUrl: './invoice-step-accounting-select-time-range.component.html',
  styleUrls: ['./invoice-step-accounting-select-time-range.component.css'],
})
export class InvoiceStepAccountingSelectTimeRangeComponent {
  @Input() invoiceData!: InvoiceDto;
  @Output() invoiceDataChange = new EventEmitter<InvoiceDto>();

  public accountingList = new Array<ShootingRangeAccountingDto>();
  public endAccountingList = new Array<ShootingRangeAccountingDto>();
  public finalAccountingList = new Array<ShootingRangeAccountingDto>();
  public organizationMap = new Map<number, OrganizationDto>();
  public selectedStartAccounting = '';
  public selectedEndAccounting = '';
  public selectedOrganization = '';
  public disableStartAccounting = true;
  public disableOrganization = true;
  public disableSubmitButton = true;

  constructor(private accountingApi: AccountingApi, private userData: UserLocalData) {}

  ngOnInit(): void {
    this.disableStartAccounting = true;
    this.disableOrganization = true;
    this.disableSubmitButton = true;

    const year = this.userData.getCurrentYear();
    this.accountingApi.getListDetailed(year).subscribe((response) => {
      this.accountingList = response;
      SortHelper.sortAccountingByDate(this.accountingList, true);
    });
  }

  public onStartAccountingChange() {
    this.disableStartAccounting = true;
    this.disableSubmitButton = true;
    const startAccounting = this.getAccountingById(+this.selectedStartAccounting);
    if (startAccounting != undefined) {
      this.disableStartAccounting = false;
      const startTime = +startAccounting.start;
      this.endAccountingList = this.accountingList.filter((value) => {
        return value.start > startTime;
      });
    }
  }

  public onEndAccountingChange() {
    this.disableOrganization = true;
    this.disableSubmitButton = true;
    const startAccounting = this.getAccountingById(+this.selectedStartAccounting);
    const endAccounting = this.getAccountingById(+this.selectedEndAccounting);

    if (startAccounting != undefined && endAccounting != undefined) {
      this.disableOrganization = false;

      const startTime = +startAccounting.start;
      const endTime = +endAccounting.start;

      this.finalAccountingList = this.accountingList.filter((value) => {
        return value.start >= startTime && value.start <= endTime;
      });

      this.organizationMap.clear();
      this.finalAccountingList.forEach((accounting) => {
        accounting.items.forEach((item) => {
          this.organizationMap.set(item.organization.id, item.organization);
        });
      });
    }
  }

  public onOrganizationChange() {
    this.disableSubmitButton = this.selectedOrganization == '';
  }

  public onSubmit() {
    const organization = this.organizationMap.get(+this.selectedOrganization);
    const startAccounting = this.getAccountingById(+this.selectedStartAccounting);
    const endAccounting = this.getAccountingById(+this.selectedEndAccounting);

    if (organization == undefined || startAccounting == undefined || endAccounting == undefined) {
      this.disableSubmitButton = true;
      return;
    }

    this.invoiceData.title =
      'Schussgeld ' +
      organization.name +
      ' ' +
      StringHelper.getStartEndDateString(startAccounting.start, endAccounting.end);
    this.invoiceData.items = new Array<InvoiceItemDto>();

    let unitList = new Array<ShootingRangeAccountingUnitDto>();

    this.finalAccountingList.forEach((accounting) => {
      const itemList = accounting.items.filter((item) => {
        return item.organization.id == organization.id;
      });

      unitList = unitList.concat(itemList);
    });

    InvoiceItemHelper.addAccountingUnitsByOrganization(organization.id, unitList, this.invoiceData.items);

    this.invoiceDataChange.emit(this.invoiceData);
  }

  public getStartEndDateTimeString(accountingData: ShootingRangeAccountingDto): string {
    return StringHelper.getStartEndDateTimeString(accountingData.start, accountingData.end);
  }

  private getAccountingById(id: number): ShootingRangeAccountingDto | undefined {
    return this.accountingList.find((value) => {
      return value.id == id;
    });
  }
}
