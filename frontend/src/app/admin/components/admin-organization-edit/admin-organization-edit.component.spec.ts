import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationEditComponent } from './admin-organization-edit.component';

describe('AdminOrganizationEditComponent', () => {
  let component: AdminOrganizationEditComponent;
  let fixture: ComponentFixture<AdminOrganizationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrganizationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
