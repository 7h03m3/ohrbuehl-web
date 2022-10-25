import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtLoginInformation} from "../shared/dtos/jwt-login-information.dto";
import {UserDto} from "../shared/dtos/user.dto";
import {UserCreateDto} from "../shared/dtos/user-create.dto";
import {UserUpdateDto} from "../shared/dtos/user-update.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = "http://127.0.0.1:3000/";
  userUrl: string = this.baseUrl + "users";

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.baseUrl + 'auth/login', {username, password});
  }

  getAllUser(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.userUrl);
  }

  public getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(this.userUrl + "/" + id);
  }

  createUser(createUser: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.userUrl, createUser);
  }

  updateUser(updateUser: UserUpdateDto): Observable<UserDto> {
    return this.http.put<UserDto>(this.userUrl, updateUser);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.userUrl + "/" + id);
  }
}
