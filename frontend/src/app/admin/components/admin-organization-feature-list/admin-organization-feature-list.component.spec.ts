import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationFeatureListComponent } from './admin-organization-feature-list.component';

describe('AdminOrganizationFeatureListComponent', () => {
  let component: AdminOrganizationFeatureListComponent;
  let fixture: ComponentFixture<AdminOrganizationFeatureListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganizationFeatureListComponent]
    });
    fixture = TestBed.createComponent(AdminOrganizationFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
