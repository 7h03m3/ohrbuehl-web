import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDateAndTimeComponent } from './enter-date-and-time.component';

describe('EnterDateAndTimeComponent', () => {
  let component: EnterDateAndTimeComponent;
  let fixture: ComponentFixture<EnterDateAndTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterDateAndTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterDateAndTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
