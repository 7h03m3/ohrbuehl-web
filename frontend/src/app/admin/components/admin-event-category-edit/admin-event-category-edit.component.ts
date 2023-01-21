import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/classes/event-category-api';

@Component({
  selector: 'app-admin-event-category-edit',
  templateUrl: './admin-event-category-edit.component.html',
  styleUrls: ['./admin-event-category-edit.component.css'],
})
export class AdminEventCategoryEditComponent {
  public formValid = true;
  public category: EventCategoryDto = new EventCategoryDto();
  private categoryApi: EventCategoryApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.categoryApi = this.apiService.getEventCategory();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != null) {
        this.category.id = Number(idString);
        this.categoryApi.getById(this.category.id).subscribe((data) => {
          this.category = data;
        });
      } else {
        this.category = new EventCategoryDto();
      }
    });
  }

  onSubmit(): void {
    if (this.category.id == 0) {
      this.categoryApi.create(this.category).subscribe(() => {
        this.openSnackBar(this.category.name + ' wurde erstellt');
        this.category = new EventCategoryDto();
      });
    } else {
      this.categoryApi.update(this.category).subscribe((data) => {
        this.openSnackBar(this.category.name + ' gespeichert');
        this.category = new EventCategoryDto();
      });
    }
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/event-category-list']);
    });
  }
}
