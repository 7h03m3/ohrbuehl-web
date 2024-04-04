import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMenuIconComponent } from './toolbar-menu-icon.component';

describe('ToolbarMenuIconComponent', () => {
  let component: ToolbarMenuIconComponent;
  let fixture: ComponentFixture<ToolbarMenuIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarMenuIconComponent]
    });
    fixture = TestBed.createComponent(ToolbarMenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
