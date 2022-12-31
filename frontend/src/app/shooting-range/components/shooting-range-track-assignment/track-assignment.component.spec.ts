import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAssignmentComponent } from './track-assignment.component';

describe('TrackAssignmentComponent', () => {
  let component: TrackAssignmentComponent;
  let fixture: ComponentFixture<TrackAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
