import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compliant-sign-in',
  templateUrl: './compliant-sign-in.page.html',
  styleUrls: ['./compliant-sign-in.page.scss'],
})
export class CompliantSignInPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  redirectToSignUp(): void {
    this.router.navigate(['/pages/auth/compliant-sign-up']);
  }

}
