import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountInformationEditDialogComponent } from './user-account-information-edit-dialog.component';

describe('UserAccountInformationEditDialogComponent', () => {
  let component: UserAccountInformationEditDialogComponent;
  let fixture: ComponentFixture<UserAccountInformationEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountInformationEditDialogComponent]
    });
    fixture = TestBed.createComponent(UserAccountInformationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
