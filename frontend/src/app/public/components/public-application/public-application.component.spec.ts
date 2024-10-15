import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicApplicationComponent } from './public-application.component';

describe('PublicApplicationComponent', () => {
  let component: PublicApplicationComponent;
  let fixture: ComponentFixture<PublicApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicApplicationComponent]
    });
    fixture = TestBed.createComponent(PublicApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
