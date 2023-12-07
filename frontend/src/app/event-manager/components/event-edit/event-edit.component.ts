import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/event-category-api';
import { EventApi } from '../../../api/event-api';
import { StringHelper } from '../../../shared/classes/string-helper';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent {
  public eventData: EventDto = new EventDto();
  public categoryList: EventCategoryDto[] = new Array<EventCategoryDto>();
  public date = '';
  public startTime = '';
  public endTime = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventApi: EventApi,
    private categoryApi: EventCategoryApi,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.categoryApi.getAll().subscribe((response) => {
      this.categoryList = response;
    });

    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != null) {
        this.eventData.id = Number(idString);
        this.eventApi.getById(this.eventData.id).subscribe((data) => {
          this.eventData = data;

          this.startTime = StringHelper.getTimeString(this.eventData.start);
          this.endTime = StringHelper.getTimeString(this.eventData.end);

          const date = new Date(+this.eventData.start);
          date.setUTCHours(0, 0, 0, 0);
          this.date = date.toISOString();
        });
      }
    });
  }

  onSubmit(): void {
    this.eventData.start = StringHelper.getDate(this.date, this.startTime);
    this.eventData.end = StringHelper.getDate(this.date, this.endTime);

    if (this.eventData.id == 0) {
      this.eventApi.create(this.eventData).subscribe(() => {
        this.openSnackBar(this.eventData.title + ' wurde erstellt');
        this.eventData = new EventDto();
      });
    } else {
      this.eventApi.update(this.eventData).subscribe((data) => {
        this.openSnackBar(this.eventData.title + ' gespeichert');
        this.eventData = new EventDto();
      });
    }
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/event-manager/event-list']);
    });
  }
}
