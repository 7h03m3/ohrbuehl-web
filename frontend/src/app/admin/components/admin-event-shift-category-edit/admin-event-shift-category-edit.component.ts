import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventShiftCategoryApi } from '../../../api/event-shift-category-api';
import { EventShiftCategoryDto } from '../../../shared/dtos/event-shift-category.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-event-shift-category-edit',
  templateUrl: './admin-event-shift-category-edit.component.html',
  styleUrls: ['./admin-event-shift-category-edit.component.css'],
})
export class AdminEventShiftCategoryEditComponent {
  public formValid = true;
  public category: EventShiftCategoryDto = new EventShiftCategoryDto();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryApi: EventShiftCategoryApi,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != null) {
        this.category.id = Number(idString);
        this.categoryApi.getById(this.category.id).subscribe((data) => {
          this.category = data;
        });
      } else {
        this.category = new EventShiftCategoryDto();
      }
    });
  }

  onSubmit(): void {
    if (this.category.id == 0) {
      this.categoryApi.create(this.category).subscribe(() => {
        this.openSnackBar(this.category.name + ' wurde erstellt');
        this.category = new EventShiftCategoryDto();
      });
    } else {
      this.categoryApi.update(this.category).subscribe((data) => {
        this.openSnackBar(this.category.name + ' gespeichert');
        this.category = new EventShiftCategoryDto();
      });
    }
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/event-shift-category-list']);
    });
  }
}
