import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelectorStandaloneComponent } from './year-selector-standalone.component';

describe('YearSelectorStandaloneComponent', () => {
  let component: YearSelectorStandaloneComponent;
  let fixture: ComponentFixture<YearSelectorStandaloneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearSelectorStandaloneComponent]
    });
    fixture = TestBed.createComponent(YearSelectorStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
