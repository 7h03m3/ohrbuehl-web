import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEditFileListComponent } from './application-edit-file-list.component';

describe('ApplicationEditFileListComponent', () => {
  let component: ApplicationEditFileListComponent;
  let fixture: ComponentFixture<ApplicationEditFileListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEditFileListComponent]
    });
    fixture = TestBed.createComponent(ApplicationEditFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
