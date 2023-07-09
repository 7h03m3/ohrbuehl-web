import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessHourEditDialogComponent } from './admin-business-hour-edit-dialog.component';

describe('AdminBusinessHourEditDialogComponent', () => {
  let component: AdminBusinessHourEditDialogComponent;
  let fixture: ComponentFixture<AdminBusinessHourEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBusinessHourEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBusinessHourEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
