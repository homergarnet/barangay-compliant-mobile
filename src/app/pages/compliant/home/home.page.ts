import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  redirectToCrime() {
    this.router.navigate(['/pages/compliant/crime']);
  }

  redirectToCompliant() {
    this.router.navigate(['/pages/compliant/compliant']);
  }

  redirectToLocation() {
    this.router.navigate(['/pages/compliant/location']);
  }

  redirectToAnnouncement() {
    this.router.navigate(['/pages/compliant/announcement']);
  }

}
