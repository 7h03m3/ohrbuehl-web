import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Role} from "../shared/enums/role.enum";
import {JwtLoginInformation} from "../shared/dtos/jwt-login-information.dto";
import {UserLocalData} from "../shared/classes/user-local-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService, private userData: UserLocalData) {
  }

  public login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.api.login(username, password).pipe(
      map(result => {
        this.userData.setSession(result);
        return result;
      }),
      catchError((err, caught) => {
        this.logout();
        return EMPTY;
      }));
  }

  public isLoggedIn() {
    return this.userData.isUserAccessTokenSet();
  }

  public getRole(): Role {
    if (this.isLoggedIn() == false) {
      return Role.Anonymous;
    }

    return this.userData.getUserRoll();
  }

  public logout() {
    this.userData.destroySession();
  }
}
