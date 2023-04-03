import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'public-public-welcome',
  templateUrl: './public-welcome.component.html',
  styleUrls: ['./public-welcome.component.css'],
})
export class PublicWelcomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onEventSelect(category: string | undefined) {
    this.router.navigate(['/public/event-list', { category: category }]);
  }
}
