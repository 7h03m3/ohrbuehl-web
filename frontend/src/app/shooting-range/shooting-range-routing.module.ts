import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from '../invoice/components/invoice-list/invoice-list.component';
import { ShootingRangeInvoicesComponent } from './components/invoices/shooting-range-invoices.component';
import { InvoiceViewComponent } from '../invoice/components/invoice-view/invoice-view.component';
import { ShootingRangeDailyAccountingComponent } from './components/daily-accounting/shooting-range-daily-accounting.component';
import { ShootingRangeAccountingListComponent } from './components/shooting-range-accounting-list/shooting-range-accounting-list.component';
import { ShootingRangeAccountingViewComponent } from './components/shooting-range-accounting-view/shooting-range-accounting-view.component';
import { ShootingRangeAccountingEditComponent } from './components/shooting-range-accounting-edit/shooting-range-accounting-edit.component';
import { ShootingRangeComponent } from './shooting-range.component';
import { BusinessHourAdminDailyViewComponent } from '../business-hours/components/business-hour-admin-daily-view/business-hour-admin-daily-view.component';
import { BusinessHourAdminViewComponent } from '../business-hours/components/business-hour-admin-view/business-hour-admin-view.component';
import { BusinessHourAdminListComponent } from '../business-hours/components/business-hour-admin-list/business-hour-admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShootingRangeComponent,
    children: [
      {
        path: '',
        redirectTo: 'reservations',
        pathMatch: 'full',
      },
      {
        path: 'reservations',
        component: BusinessHourAdminDailyViewComponent,
      },
      {
        path: 'reservations/edit',
        component: BusinessHourAdminViewComponent,
      },
      {
        path: 'reservations/list',
        component: BusinessHourAdminListComponent,
      },
      {
        path: 'invoice-list',
        component: InvoiceListComponent,
      },
      {
        path: 'invoice-edit',
        component: ShootingRangeInvoicesComponent,
      },
      {
        path: 'invoice-view',
        component: InvoiceViewComponent,
      },
      {
        path: 'daily-accounting',
        component: ShootingRangeDailyAccountingComponent,
      },
      {
        path: 'accounting-list',
        component: ShootingRangeAccountingListComponent,
      },
      {
        path: 'accounting-view',
        component: ShootingRangeAccountingViewComponent,
      },
      {
        path: 'accounting-edit',
        component: ShootingRangeAccountingEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShootingRangeRoutingModule {}
