import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FormatterService } from 'src/app/services/formatter.service';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import { environment } from 'src/environments/environment';
import { passwordMatch } from 'src/validators/passwordMatch';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-compliant-sign-up',
  templateUrl: './compliant-sign-up.page.html',
  styleUrls: ['./compliant-sign-up.page.scss'],
})
export class CompliantSignUpPage implements OnInit {


  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // 1 to 31
  age: number = 0;

  months: any = [
    {
      "Month": "January",
      "MonthNum": 1,
    },
    {
      "Month": "February",
      "MonthNum": 2,
    },
    {
      "Month": "March",
      "MonthNum": 3,
    },
    {
      "Month": "April",
      "MonthNum": 4,
    },
    {
      "Month": "May",
      "MonthNum": 5,
    },
    {
      "Month": "June",
      "MonthNum": 6,
    },
    {
      "Month": "July",
      "MonthNum": 7,
    },
    {
      "Month": "August",
      "MonthNum": 8,
    },
    {
      "Month": "September",
      "MonthNum": 9,
    },
    {
      "Month": "October",
      "MonthNum": 10,
    },
    {
      "Month": "November",
      "MonthNum": 11,
    },
    {
      "Month": "December",
      "MonthNum": 12,
    },
  ];
  years: number[] = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); // Last 100 years

  imgDisplay:string | ArrayBuffer = environment.imgNoImageDisplay;
  imgDisplay2:string | ArrayBuffer = environment.imgNoImageDisplay;

  showPassword: boolean = false;
  selectedResidency: string = '';

  validIdFile: any;
  selfieIdFile: any;

  compliantSignUpForm: FormGroup = new FormGroup({

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),

    middleName: new FormControl(''),

    lastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),

    birthMonth: new FormControl('',[
      Validators.required,
    ]),

    birthDay: new FormControl('',[
      Validators.required,
    ]),

    birthYear: new FormControl('',[
      Validators.required,
    ]),

    birthAge: new FormControl('',[
      Validators.required,
    ]),

    gender: new FormControl('',[
      Validators.required,
    ]),

    contactNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20)
    ]),

    validId: new FormControl('', [
      Validators.required,
    ]),

    selfieId: new FormControl('', [
      Validators.required,
    ]),

    residencyType: new FormControl('permanent',[
      Validators.required,
    ]),

    houseNo: new FormControl('',[
      Validators.required,
    ]),

    street: new FormControl('',[
      Validators.required,
    ]),

    village: new FormControl('',[
      Validators.required,
    ]),

    unitFloor: new FormControl('',[
      Validators.required,
    ]),

    building: new FormControl('',[
      Validators.required,
    ]),

    province: new FormControl('369',[
      Validators.required,
    ]),

    cityMunicipality: new FormControl('36913',[
      Validators.required,
    ]),

    barangay: new FormControl('',[
      Validators.required,
    ]),

    zipCode: new FormControl('2305',[
      Validators.required,
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(320)
    ]),

    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),

    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),

    termsAndConditions: new FormControl(false, [
      Validators.requiredTrue,
    ]),

  }, [passwordMatch("password", "confirmPassword")]);


  constructor(
    private router: Router,
    public formatterService: FormatterService,
    private spinner: NgxSpinnerService,
    private autService: AuthService,
    private toastrCustomService: ToastrCustomService,
  ) {

  }

  ngOnInit(): void {

    // Swal.fire({
    //   title: 'Custom Sized SweetAlert',
    //   text: 'This is a smaller SweetAlert that fits on the screen.',
    //   icon: 'info',
    //   customClass: 'smaller-swal', // Apply the custom class here
    //   showCancelButton: true,
    //   confirmButtonText: 'OK',
    //   cancelButtonText: 'Cancel',
    //   heightAuto: false
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // Handle the OK button click
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     // Handle the Cancel button click
    //   }
    // });

  }

  onChangeDayDateYear(): void {
    const birthDate: any = new Date(this.birthYear?.value, this.birthMonth?.value - 1, this.birthDay?.value);
    const currentDate: any = new Date();

    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / 3.15576e+10);

    let compliantSignUpFormValue = {

      birthAge: ageInYears,

    }

    this.compliantSignUpForm.patchValue(compliantSignUpFormValue);

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgDisplay = e.target.result; // Display the selected image immediately
      };
      reader.readAsDataURL(file);

      this.validIdFile = event.target.files[0];

    } else {
      this.imgDisplay = environment.imgNoImageDisplay;
      this.validIdFile = null;
    }
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgDisplay2 = e.target.result; // Display the selected image immediately
      };

      reader.readAsDataURL(file);
      this.selfieIdFile = event.target.files[0];

    } else {

      this.imgDisplay2 = environment.imgNoImageDisplay;
      this.selfieIdFile = null;

    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  swiperSlideChanged(e: any) {
    // console.log('changed: ', e)
  }

  redirectToSignIn(): void {
    this.router.navigate(['/pages/auth/compliant-sign-in']);
  }

  onSignUp(): void {

    if(this.compliantSignUpForm.valid) {

      this.spinner.show();
      this.autService.userRegistration(this.compliantSignUpForm.getRawValue(),this.validIdFile,this.selfieIdFile).subscribe(res => {

        this.toastrCustomService.showSuccess("Account Created Successfully", "Success");
        this.router.navigate(['/pages/auth/compliant-sign-in']);
        this.spinner.hide();

      }, error => {

        if(error.error === "User Already Exist") {
          this.toastrCustomService.showError(error.error, "Error");
        } else {
          this.toastrCustomService.showError("Unavailable to use app", "Error");
        }

        // if(error.error.err_msg == "User already exists.") {

        //   Swal.fire("Warning", "User already exist", "warning");

        // } else if(error.error.err_msg.indexOf("User already exists") !== -1) {

        //   Swal.fire("Warning", "Email already exist", "warning");

        // }

        this.spinner.hide();

      });
    } else {

      this.toastrCustomService.showError("re check all fields", "Error");
      this.spinner.hide();


    }


  }

  acceptTermsAndConditionChange(event: any) {
    // event.detail.checked is true when the checkbox is checked, false when unchecked
    const isChecked = event.detail.checked;


    if (isChecked) {
      console.log('Checkbox is checked');
      let compliantSignUpFormValue = {

        termsAndConditions: true,

      }

      this.compliantSignUpForm.patchValue(compliantSignUpFormValue);


    } else {
      console.log('Checkbox is unchecked');
    }
  }

  get firstName() {

    return this.compliantSignUpForm.get('firstName');

  }

  get middleName() {

    return this.compliantSignUpForm.get('middleName');

  }

  get lastName() {

    return this.compliantSignUpForm.get('lastName');

  }

  get birthMonth() {

    return this.compliantSignUpForm.get('birthMonth');

  }

  get birthDay() {

    return this.compliantSignUpForm.get('birthDay');

  }

  get birthYear() {

    return this.compliantSignUpForm.get('birthYear');

  }

  get birthAge() {

    return this.compliantSignUpForm.get('birthAge');

  }

  get gender() {

    return this.compliantSignUpForm.get('gender');

  }

  get contactNumber() {

    return this.compliantSignUpForm.get('contactNumber');

  }

  get validId() {

    return this.compliantSignUpForm.get('validId');

  }

  get selfieId() {

    return this.compliantSignUpForm.get('selfieId');

  }

  get residencyType() {

    return this.compliantSignUpForm.get('residencyType');

  }

  get houseNo() {

    return this.compliantSignUpForm.get('houseNo');

  }

  get street() {

    return this.compliantSignUpForm.get('street');

  }

  get village() {

    return this.compliantSignUpForm.get('village');

  }

  get unitFloor() {

    return this.compliantSignUpForm.get('unitFloor');

  }

  get building() {

    return this.compliantSignUpForm.get('building');

  }

  get province() {

    return this.compliantSignUpForm.get('province');

  }

  get cityMunicipality() {

    return this.compliantSignUpForm.get('cityMunicipality');

  }

  get barangay() {

    return this.compliantSignUpForm.get('barangay');

  }

  get zipCode() {

    return this.compliantSignUpForm.get('zipCode');

  }

  get email() {

    return this.compliantSignUpForm.get('email');

  }

  get username() {

    return this.compliantSignUpForm.get('username');

  }

  get password() {

    return this.compliantSignUpForm.get('password');

  }

  //for confirmPassword
  getControl(name: any): AbstractControl | null {
    return this.compliantSignUpForm.get(name);
  }

  get termsAndConditions() {

    return this.compliantSignUpForm.get('termsAndConditions');

  }

}
