import { Injectable } from '@angular/core';
import { EventDto } from '../../shared/dtos/event.dto';
import { ListTimeRange } from '../../shared/enums/list-time-range';
import { UserLocalData } from '../../shared/classes/user-local-data';

@Injectable({
  providedIn: 'root',
})
export class EventHelper {
  constructor(private userLocalData: UserLocalData) {}

  public filterEventList(eventList: EventDto[]): EventDto[] {
    const timeRange = this.userLocalData.getCurrentListItemRange();
    if (timeRange == ListTimeRange.PastItems) {
      const time = Date.now();
      eventList = eventList.filter((current) => {
        return current.start < time;
      });
    } else if (timeRange == ListTimeRange.FutureItems) {
      const time = Date.now();

      eventList = eventList.filter((current) => {
        return current.start > time;
      });

      eventList.sort((a, b) => {
        return a.start > b.start ? 1 : a.start < b.start ? -1 : 0;
      });
    }

    return eventList;
  }
}
