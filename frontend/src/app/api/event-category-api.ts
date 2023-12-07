import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventCategoryDto } from '../shared/dtos/event-category.dto';
import { EventCategoryCreateDto } from '../shared/dtos/event-category-create.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class EventCategoryApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('events/category');
  }

  public getAll(): Observable<EventCategoryDto[]> {
    return this.http.get<EventCategoryDto[]>(this.url);
  }

  public getById(id: number): Observable<EventCategoryDto> {
    return this.http.get<EventCategoryDto>(this.url + '/' + id);
  }

  public getByAbbreviation(abbreviation: string): Observable<EventCategoryDto> {
    return this.http.get<EventCategoryDto>(this.url + '/byAbbreviation/' + abbreviation);
  }

  public create(createDto: EventCategoryCreateDto): Observable<EventCategoryDto> {
    return this.http.post<EventCategoryDto>(this.url, createDto);
  }

  public update(updateDto: EventCategoryDto): Observable<EventCategoryDto> {
    return this.http.put<EventCategoryDto>(this.url, updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
