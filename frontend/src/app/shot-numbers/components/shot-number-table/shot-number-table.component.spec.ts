import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotNumberTableComponent } from './shot-number-table.component';

describe('ShotNumberTableComponent', () => {
  let component: ShotNumberTableComponent;
  let fixture: ComponentFixture<ShotNumberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShotNumberTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShotNumberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
