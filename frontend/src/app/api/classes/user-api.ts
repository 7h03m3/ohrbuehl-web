import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../shared/dtos/user.dto';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';

export class UserApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'users');
  }

  public getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.url);
  }

  public getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(this.url + '/' + id);
  }

  public create(createUser: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.url, createUser);
  }

  public update(updateUser: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(this.url, updateUser);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
