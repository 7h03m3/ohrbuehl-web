import { Component, ViewChild } from '@angular/core';
import { EventDto } from '../../../shared/dtos/event.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { EventApi } from '../../../api/classes/event-api';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ApiService } from '../../../api/api.service';
import { StatisticEventShiftsTableComponent } from '../statistic-event-shifts/statistic-event-shifts-table.component';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/classes/event-category-api';
import { SortHelper } from '../../../shared/classes/sort-helper';

@Component({
  selector: 'app-statistic-event-shifts-bu',
  templateUrl: './statistic-event-shifts-bu.component.html',
  styleUrls: ['./statistic-event-shifts-bu.component.css'],
})
export class StatisticEventShiftsBuComponent {
  public eventList = new Array<EventDto>();
  public organizationList = new Array<OrganizationDto>();
  public categoryList = new Array<EventCategoryDto>();
  public selectedCategory = 0;
  private tableComponent: any;
  private eventApi: EventApi;
  private eventCategoryApi: EventCategoryApi;
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService) {
    this.eventApi = this.apiService.getEvent();
    this.organizationApi = this.apiService.getOrganization();
    this.eventCategoryApi = this.apiService.getEventCategory();
  }

  @ViewChild(StatisticEventShiftsTableComponent)
  set appShark(child: StatisticEventShiftsTableComponent) {
    this.tableComponent = child;
  }

  public ngOnInit(): void {
    this.loadCategories();
    this.loadShifts(this.selectedCategory);
  }

  public onCategoryChange(newValue: number) {
    this.loadShifts(newValue);
  }

  private loadShifts(categoryId: number) {
    if (categoryId == 0) {
      this.eventApi.getAllWithShifts().subscribe((response) => {
        this.eventList = response;
        this.fetch();
      });
    } else {
      this.eventApi.getAllWithShiftsByCategoryId(categoryId).subscribe((response) => {
        this.eventList = response;
        this.fetch();
      });
    }
  }

  private fetch() {
    SortHelper.sortEventsByDate(this.eventList, true);
    this.organizationApi.getAllNative().subscribe((response) => {
      this.organizationList = response;
      this.tableComponent.fetch(this.eventList, this.organizationList);
    });
  }

  private loadCategories() {
    this.eventCategoryApi.getAll().subscribe((response) => {
      this.categoryList = new Array<EventCategoryDto>();

      const allCategory = new EventCategoryDto();
      allCategory.name = 'Alle';
      this.categoryList.push(allCategory);

      response.forEach((category) => {
        this.categoryList.push(category);
      });
    });
  }
}
