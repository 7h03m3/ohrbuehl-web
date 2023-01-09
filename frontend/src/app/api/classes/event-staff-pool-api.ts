import {BaseApi} from "./base-api";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventShiftDto} from "../../shared/dtos/event-shift.dto";
import {EventShiftCreateDto} from "../../shared/dtos/event-shift-create.dto";
import {EventStaffPoolDto} from "../../shared/dtos/event-staff-pool.dto";

export class EventStaffPoolApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'events/staff-pool');
  }

  public getAllByOrganization(organizationId: number): Observable<EventStaffPoolApi[]> {
    return this.http.get<EventStaffPoolApi[]>(this.url + '/' + organizationId);
  }

  public getAllByOrganizationAndEvent(organizationId: number, eventId: number): Observable<EventStaffPoolApi[]> {
    return this.http.get<EventStaffPoolApi[]>(this.url + '/' + organizationId+'/'+eventId);
  }

  public addStaff(dto: EventStaffPoolDto): Observable<EventStaffPoolDto> {
    return this.http.post<EventStaffPoolDto>(this.url, dto);
  }

  public removeStaff(dto: EventStaffPoolDto): Observable<any> {
    return this.http.delete(this.url  + '/' + dto.organizationId + '/' + dto.eventId + '/' + dto.memberId);
  }
}
