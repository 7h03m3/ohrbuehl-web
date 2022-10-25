import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLocalData} from "../shared/classes/user-local-data";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userData: UserLocalData) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.userData.getUserAccessToken();

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + accessToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
