import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationDeleteDialogComponent } from './admin-organization-delete-dialog.component';

describe('AdminOrganizationDeleteDialogComponent', () => {
  let component: AdminOrganizationDeleteDialogComponent;
  let fixture: ComponentFixture<AdminOrganizationDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrganizationDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
