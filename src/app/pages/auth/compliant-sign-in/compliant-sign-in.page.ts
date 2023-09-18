import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compliant-sign-in',
  templateUrl: './compliant-sign-in.page.html',
  styleUrls: ['./compliant-sign-in.page.scss'],
})
export class CompliantSignInPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
