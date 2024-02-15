import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileDialogComponent } from './admin-file-dialog.component';

describe('AdminFileDialogComponent', () => {
  let component: AdminFileDialogComponent;
  let fixture: ComponentFixture<AdminFileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFileDialogComponent]
    });
    fixture = TestBed.createComponent(AdminFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
