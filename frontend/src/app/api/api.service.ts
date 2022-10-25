import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtLoginInformation} from "../shared/dtos/jwt-login-information.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = "http://127.0.0.1:3000/";

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.baseUrl + 'auth/login', {username, password});
  }
}
