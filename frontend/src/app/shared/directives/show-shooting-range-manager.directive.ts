import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JwtLoginInformation } from '../dtos/jwt-login-information.dto';
import { Subscription } from 'rxjs';
import { Role } from '../enums/role.enum';

@Directive({
  selector: '[appShowShootingRangeManager]',
})
export class ShowShootingRangeManagerDirective implements OnInit, OnDestroy {
  private hasView = false;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {
    this.subscription = this.authService.getLoginSubject().subscribe((information) => {
      this.checkRights(information);
    });
  }

  public ngOnInit(): void {
    this.checkRights(this.authService.getLogin());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkRights(login: JwtLoginInformation) {
    const isAdmin = login.roles == Role.Admin;
    const isContentManager = login.roles == Role.ShootingRangeManager;
    if (isAdmin || isContentManager) {
      if (!this.hasView) {
        this.hasView = true;
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.hasView = false;
      this.viewContainer.clear();
    }
  }
}
