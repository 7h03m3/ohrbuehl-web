import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotNumbersComponent } from './shot-numbers.component';

describe('ShotNumbersComponent', () => {
  let component: ShotNumbersComponent;
  let fixture: ComponentFixture<ShotNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShotNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShotNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
