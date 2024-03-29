import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from './base-api';
import { NotificationReceiverDto } from '../../shared/dtos/notification-receiver.dto';

export class NotificationApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'notifications');
  }

  public getAllNotifier(): Observable<NotificationReceiverDto[]> {
    return this.http.get<NotificationReceiverDto[]>(this.url + '/notifier/');
  }

  public createNotifier(dto: NotificationReceiverDto): Observable<NotificationReceiverDto> {
    return this.http.post<NotificationReceiverDto>(this.url + '/notifier/', dto);
  }

  public updateNotifier(dto: NotificationReceiverDto): Observable<NotificationReceiverDto> {
    return this.http.put<NotificationReceiverDto>(this.url + '/notifier/', dto);
  }

  public deleteNotifier(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/notifier/' + id);
  }
}
