import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountInformationComponent } from './user-account-information.component';

describe('UserAccountInformationComponent', () => {
  let component: UserAccountInformationComponent;
  let fixture: ComponentFixture<UserAccountInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountInformationComponent]
    });
    fixture = TestBed.createComponent(UserAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
