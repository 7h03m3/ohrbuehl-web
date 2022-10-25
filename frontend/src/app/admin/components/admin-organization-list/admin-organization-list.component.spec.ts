import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationListComponent } from './admin-organization-list.component';

describe('AdminOrganizationListComponent', () => {
  let component: AdminOrganizationListComponent;
  let fixture: ComponentFixture<AdminOrganizationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrganizationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
