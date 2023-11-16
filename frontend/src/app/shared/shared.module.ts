import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { SidenavService } from './services/sidenav.service';
import { TimeRangeSelectorComponent } from './components/time-range-selector/time-range-selector.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { YearSelectorStandaloneComponent } from './components/year-selector-standalone/year-selector-standalone.component';

@NgModule({
  declarations: [SidenavComponent, YearSelectorComponent, YearSelectorStandaloneComponent, TimeRangeSelectorComponent],
  exports: [SidenavComponent, YearSelectorStandaloneComponent, TimeRangeSelectorComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [SidenavService],
})
export class SharedModule {}
