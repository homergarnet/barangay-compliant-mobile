import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToHome() {
    this.router.navigate(['/pages/compliant/home']);
  }

  redirectToProfileInformation() {
    this.router.navigate(['/pages/compliant/profile-information']);
  }

  redirectToReportHistory() {
    this.router.navigate(['/pages/compliant/report-history']);
  }

}
