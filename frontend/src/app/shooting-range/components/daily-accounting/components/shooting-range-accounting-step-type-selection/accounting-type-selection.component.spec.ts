import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingTypeSelectionComponent } from './accounting-type-selection.component';

describe('AccountingTypeSelectionComponent', () => {
  let component: AccountingTypeSelectionComponent;
  let fixture: ComponentFixture<AccountingTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingTypeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
