import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { EventShiftCategoryDto } from '../../../shared/dtos/event-shift-category.dto';
import { EventShiftCategoryApi } from '../../../api/classes/event-shift-category-api';

@Component({
  selector: 'app-admin-event-shift-category-list',
  templateUrl: './admin-event-shift-category-list.component.html',
  styleUrls: ['./admin-event-shift-category-list.component.css'],
})
export class AdminEventShiftCategoryListComponent {
  categoryList$ = new Observable<EventShiftCategoryDto[]>();
  displayedColumns: string[] = ['id', 'name', 'abbreviation', 'position', 'action'];
  private categoryApi: EventShiftCategoryApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
  ) {
    this.categoryApi = this.apiService.getEventShiftCategory();
  }

  public ngOnInit(): void {
    this.fetch();
  }

  public onDelete(element: EventShiftCategoryDto) {
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

  public onEdit(element: EventShiftCategoryDto) {
    this.router.navigate(['/admin/event-shift-category-edit', { id: element.id }]);
  }

  public onCreate() {
    this.router.navigate(['/admin/event-shift-category-edit']);
  }

  private fetch() {
    this.categoryList$ = this.categoryApi.getAll();
  }
}
