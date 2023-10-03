import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  redirectUrl: any = '';
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(320),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.authService.redirectToPage('compliant');
    this.redirectUrl =
      this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') ||
      'pages/compliant/home';
  }

  onForgotPassword(): void {
    this.spinner.show();
    if (this.forgotPasswordForm.valid) {
      this.authService
        .sendForgotPassword(this.forgotPasswordForm.get('email')?.value)
        .subscribe(
          (res) => {
            // console.log('res: ', res);
            let result: any = res;
            Swal.fire({
              title: 'Success',
              text: 'You can check your email inbox or spam to reset your password',
              icon: 'success',
              customClass: 'smaller-swal', // Apply the custom class here
              // showCancelButton: true,
              confirmButtonText: 'OK',
              // cancelButtonText: 'Cancel',
              heightAuto: false,
            }).then((result) => {
              if (result.isConfirmed) {
                // Handle the OK button click
                this.router.navigate(['/pages/auth/compliant-sign-in'], { queryParams: {} });
              }

            });
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error.error);
            console.log('error: ', error);
          }
        );
    } else {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'check all validations',
        icon: 'warning',
        customClass: 'smaller-swal', // Apply the custom class here
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle the OK button click
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle the Cancel button click
        }
      });
    }
  }
}
