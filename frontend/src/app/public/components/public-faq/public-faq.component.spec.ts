import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFaqComponent } from './public-faq.component';

describe('PublicFaqComponent', () => {
  let component: PublicFaqComponent;
  let fixture: ComponentFixture<PublicFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicFaqComponent]
    });
    fixture = TestBed.createComponent(PublicFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
