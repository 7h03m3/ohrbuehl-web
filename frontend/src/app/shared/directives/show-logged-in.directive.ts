import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JwtLoginInformation } from '../dtos/jwt-login-information.dto';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowLoggedIn]',
})
export class ShowLoggedInDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.subscription = this.authService
      .getLoginSubject()
      .subscribe((information) => {
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
    if (login.id != 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
