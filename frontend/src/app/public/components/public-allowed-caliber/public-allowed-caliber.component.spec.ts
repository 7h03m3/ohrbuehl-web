import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAllowedCaliberComponent } from './public-allowed-caliber.component';

describe('PublicAllowedCaliberComponent', () => {
  let component: PublicAllowedCaliberComponent;
  let fixture: ComponentFixture<PublicAllowedCaliberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicAllowedCaliberComponent]
    });
    fixture = TestBed.createComponent(PublicAllowedCaliberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
