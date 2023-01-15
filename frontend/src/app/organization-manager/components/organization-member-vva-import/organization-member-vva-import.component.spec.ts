import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberVvaImportComponent } from './organization-member-vva-import.component';

describe('OrganizationMemberVvaImportComponent', () => {
  let component: OrganizationMemberVvaImportComponent;
  let fixture: ComponentFixture<OrganizationMemberVvaImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationMemberVvaImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberVvaImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
