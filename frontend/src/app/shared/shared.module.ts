import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { SidenavService } from './services/sidenav.service';

@NgModule({
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [SidenavService],
})
export class SharedModule {}
