import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ShotNumberTableComponent } from './components/shooting-range-shot-number-table/shot-number-table.component';
import { TrackAssignmentComponent } from './components/shooting-range-track-assignment/track-assignment.component';
import { ShootingRangeComponent } from './shooting-range.component';
import { ShootingRangeInvoicesComponent } from './components/invoices/shooting-range-invoices.component';
import { InvoiceInformationComponent } from '../invoice/components/invoice-information/invoice-information.component';
import { InvoiceItemEditComponent } from '../invoice/components/invoice-item-edit/invoice-item-edit.component';
import { InvoiceDetailViewComponent } from '../invoice/components/invoice-detail-view/invoice-detail-view.component';
import { InvoiceListComponent } from '../invoice/components/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from '../invoice/components/invoice-view/invoice-view.component';
import { AccountingTypeSelectionComponent } from './components/daily-accounting/components/shooting-range-accounting-step-type-selection/accounting-type-selection.component';
import { EnterDateAndTimeComponent } from './components/daily-accounting/components/shooting-range-accounting-step-enter-date-and-time/enter-date-and-time.component';
import { AccountingStepUploadSiusDataComponent } from './components/daily-accounting/components/shooting-range-accounting-step-upload-sius-data/accounting-step-upload-sius-data.component';
import { ViewDetailComponent } from './components/daily-accounting/components/shooting-range-accounting-step-view-detail/view-detail.component';
import { ShootingRangeDailyAccountingComponent } from './components/daily-accounting/shooting-range-daily-accounting.component';
import { ShootingRangeAccountingListComponent } from './components/shooting-range-accounting-list/shooting-range-accounting-list.component';
import { ShootingRangeAccountingViewComponent } from './components/shooting-range-accounting-view/shooting-range-accounting-view.component';
import { ShootingRangeAccountingEditComponent } from './components/shooting-range-accounting-edit/shooting-range-accounting-edit.component';
import { ShootingRangeRoutingModule } from './shooting-range-routing.module';

@NgModule({
  declarations: [
    ShotNumberTableComponent,
    TrackAssignmentComponent,
    ShootingRangeComponent,
    ShootingRangeInvoicesComponent,
    InvoiceInformationComponent,
    InvoiceItemEditComponent,
    InvoiceDetailViewComponent,
    InvoiceListComponent,
    InvoiceViewComponent,
    AccountingTypeSelectionComponent,
    EnterDateAndTimeComponent,
    AccountingStepUploadSiusDataComponent,
    ViewDetailComponent,
    ShootingRangeDailyAccountingComponent,
    ShootingRangeAccountingListComponent,
    ShootingRangeAccountingViewComponent,
    ShootingRangeAccountingEditComponent,
  ],
  imports: [CommonModule, MaterialModule, ShootingRangeRoutingModule],
})
export class ShootingRangeModule {}
