import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { SidenavService } from './services/sidenav.service';
import { TimeRangeSelectorComponent } from './components/time-range-selector/time-range-selector.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { YearSelectorStandaloneComponent } from './components/year-selector-standalone/year-selector-standalone.component';
import { ShowAdminDirective } from './directives/show-admin.directive';
import { ShowLoggedInDirective } from './directives/show-logged-in.directive';
import { ShowLoggedOutDirective } from './directives/show-logged-out.directive';
import { ShowSingleShooterDirective } from './directives/show-single-shooter.directive';
import { ShowShootingRangeManagerDirective } from './directives/show-shooting-range-manager.directive';
import { ShowOrganizationManagerDirective } from './directives/show-organization-manager.directive';
import { ShowEventOrganizerDirective } from './directives/show-event-organizer.directive';

@NgModule({
  declarations: [
    SidenavComponent,
    YearSelectorComponent,
    YearSelectorStandaloneComponent,
    TimeRangeSelectorComponent,
    ShowAdminDirective,
    ShowLoggedInDirective,
    ShowLoggedOutDirective,
    ShowSingleShooterDirective,
    ShowShootingRangeManagerDirective,
    ShowOrganizationManagerDirective,
    ShowEventOrganizerDirective,
  ],
  exports: [
    SidenavComponent,
    YearSelectorStandaloneComponent,
    TimeRangeSelectorComponent,
    ShowAdminDirective,
    ShowLoggedInDirective,
    ShowLoggedOutDirective,
    ShowSingleShooterDirective,
    ShowShootingRangeManagerDirective,
    ShowOrganizationManagerDirective,
    ShowEventOrganizerDirective,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [SidenavService],
})
export class SharedModule {}
