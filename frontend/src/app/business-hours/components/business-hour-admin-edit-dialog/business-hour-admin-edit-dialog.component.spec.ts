import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourAdminEditDialogComponent } from './business-hour-admin-edit-dialog.component';

describe('AdminBusinessHourEditDialogComponent', () => {
  let component: BusinessHourAdminEditDialogComponent;
  let fixture: ComponentFixture<BusinessHourAdminEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessHourAdminEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHourAdminEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
