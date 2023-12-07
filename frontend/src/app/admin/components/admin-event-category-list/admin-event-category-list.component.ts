import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/event-category-api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-admin-event-category-list',
  templateUrl: './admin-event-category-list.component.html',
  styleUrls: ['./admin-event-category-list.component.css'],
})
export class AdminEventCategoryListComponent {
  categoryList$ = new Observable<EventCategoryDto[]>();
  displayedColumns: string[] = ['id', 'name', 'abbreviation', 'action'];

  constructor(private categoryApi: EventCategoryApi, public dialog: MatDialog, private router: Router) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public onDelete(element: EventCategoryDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: element.name + ' (' + element.abbreviation + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onEdit(element: EventCategoryDto) {
    this.router.navigate(['/admin/event-category-edit', { id: element.id }]);
  }

  public onCreate() {
    this.router.navigate(['/admin/event-category-edit']);
  }

  private fetch() {
    this.categoryList$ = this.categoryApi.getAll();
  }
}
