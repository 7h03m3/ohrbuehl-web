import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotifierEditDialogComponent } from './admin-notifier-edit-dialog.component';

describe('AdminNotifierEditDialogComponent', () => {
  let component: AdminNotifierEditDialogComponent;
  let fixture: ComponentFixture<AdminNotifierEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNotifierEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNotifierEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
