import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationCreateComponent } from './admin-organization-create.component';

describe('AdminOrganizationCreateComponent', () => {
  let component: AdminOrganizationCreateComponent;
  let fixture: ComponentFixture<AdminOrganizationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrganizationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
