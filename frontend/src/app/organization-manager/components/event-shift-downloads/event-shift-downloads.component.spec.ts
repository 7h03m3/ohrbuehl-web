import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShiftDownloadsComponent } from './event-shift-downloads.component';

describe('EventShiftDownloadsComponent', () => {
  let component: EventShiftDownloadsComponent;
  let fixture: ComponentFixture<EventShiftDownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShiftDownloadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventShiftDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
