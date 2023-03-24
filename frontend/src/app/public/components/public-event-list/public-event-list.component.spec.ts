import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventListComponent } from './public-event-list.component';

describe('PublicEventListComponent', () => {
  let component: PublicEventListComponent;
  let fixture: ComponentFixture<PublicEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicEventListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
