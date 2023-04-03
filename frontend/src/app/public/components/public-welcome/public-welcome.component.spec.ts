import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWelcomeComponent } from './public-welcome.component';

describe('MainWelcomeComponent', () => {
  let component: PublicWelcomeComponent;
  let fixture: ComponentFixture<PublicWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicWelcomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
