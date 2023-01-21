import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from '../shared/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    if (this.authService.isLoggedIn() && (userRole == expectedRole || userRole == Role.Admin)) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!childRoute.parent) {
      return false;
    }
    return this.canActivate(childRoute.parent);
  }
}
