import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotifierListComponent } from './admin-notifier-list.component';

describe('AdminNotfierListComponent', () => {
  let component: AdminNotifierListComponent;
  let fixture: ComponentFixture<AdminNotifierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNotifierListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNotifierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
