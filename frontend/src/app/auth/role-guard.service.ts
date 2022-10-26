import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Role} from "../shared/enums/role.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    if (this.authService.isLoggedIn() && ((userRole == expectedRole) || (userRole == Role.Admin))) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
