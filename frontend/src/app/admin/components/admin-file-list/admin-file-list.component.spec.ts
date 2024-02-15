import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileListComponent } from './admin-file-list.component';

describe('AdminFileListComponent', () => {
  let component: AdminFileListComponent;
  let fixture: ComponentFixture<AdminFileListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFileListComponent]
    });
    fixture = TestBed.createComponent(AdminFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
