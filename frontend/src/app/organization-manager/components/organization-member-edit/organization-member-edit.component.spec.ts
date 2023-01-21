import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberEditComponent } from './organization-member-edit.component';

describe('OrganizationMemberEditComponent', () => {
  let component: OrganizationMemberEditComponent;
  let fixture: ComponentFixture<OrganizationMemberEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationMemberEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
