import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationFeatureDialogComponent } from './admin-organization-feature-dialog.component';

describe('AdminOrganizationFeatureDialogComponent', () => {
  let component: AdminOrganizationFeatureDialogComponent;
  let fixture: ComponentFixture<AdminOrganizationFeatureDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganizationFeatureDialogComponent]
    });
    fixture = TestBed.createComponent(AdminOrganizationFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
