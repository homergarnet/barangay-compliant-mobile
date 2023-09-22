import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-compliant-sign-in',
  templateUrl: './compliant-sign-in.page.html',
  styleUrls: ['./compliant-sign-in.page.scss'],
})
export class CompliantSignInPage implements OnInit {

  redirectUrl: any = '';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(

    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {

    this.authService.redirectToPage('compliant');
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || 'pages/compliant/home';

  }

  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  redirectToSignUp(): void {
    this.router.navigate(['/pages/auth/compliant-sign-up']);
  }

  sampleLogin(): void {

    this.spinner.show();
    this.authService.getAccessToken(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value, "compliant").subscribe(res => {
      console.log("res: ", res);
      let result: any = res;
      this.authService.setSession(result, 'compliant');

      this.router.navigateByUrl(this.redirectUrl);
      this.spinner.hide();

    }, error => {

      this.spinner.hide();
      this.toastr.error('user name or password is wrong');
      console.log("error: ", error);

    });
  }

}
