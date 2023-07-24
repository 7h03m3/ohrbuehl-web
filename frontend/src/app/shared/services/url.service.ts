import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private previousUrl = '';
  private currentUrl = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.currentUrl != event.url) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        }
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
