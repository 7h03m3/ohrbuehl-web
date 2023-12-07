import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventShiftCategoryDto } from '../../shared/dtos/event-shift-category.dto';
import { EventShiftCategoryCreateDto } from '../../shared/dtos/event-shift-category-create.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class EventShiftCategoryApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('events/shift-category');
  }

  public getAll(): Observable<EventShiftCategoryDto[]> {
    return this.http.get<EventShiftCategoryDto[]>(this.url);
  }

  public getById(id: number): Observable<EventShiftCategoryDto> {
    return this.http.get<EventShiftCategoryDto>(this.url + '/' + id);
  }

  public create(createDto: EventShiftCategoryCreateDto): Observable<EventShiftCategoryDto> {
    return this.http.post<EventShiftCategoryDto>(this.url, createDto);
  }

  public update(updateDto: EventShiftCategoryDto): Observable<EventShiftCategoryDto> {
    return this.http.put<EventShiftCategoryDto>(this.url, updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
