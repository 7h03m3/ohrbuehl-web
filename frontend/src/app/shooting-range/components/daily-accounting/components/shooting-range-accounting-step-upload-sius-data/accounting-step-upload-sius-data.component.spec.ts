import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingStepUploadSiusDataComponent } from './accounting-step-upload-sius-data.component';

describe('UploadSiusDataComponent', () => {
  let component: AccountingStepUploadSiusDataComponent;
  let fixture: ComponentFixture<AccountingStepUploadSiusDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingStepUploadSiusDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingStepUploadSiusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
