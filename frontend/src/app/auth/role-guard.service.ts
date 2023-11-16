import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from '../shared/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    if (expectedRole && this.authService.isLoggedIn()) {
      if (userRole == Role.Admin) {
        return true;
      }

      const multipleRoles = expectedRole instanceof Array;
      if (multipleRoles) {
        const result = expectedRole.find((role) => role == userRole);
        if (result != undefined) {
          return true;
        }
      } else if (userRole == expectedRole) {
        return true;
      }
    }

    this.router.navigate(['/user/login']);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!childRoute.parent) {
      return false;
    }
    return this.canActivate(childRoute.parent);
  }
}
