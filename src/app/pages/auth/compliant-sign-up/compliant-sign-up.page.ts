import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-compliant-sign-up',
  templateUrl: './compliant-sign-up.page.html',
  styleUrls: ['./compliant-sign-up.page.scss'],
})
export class CompliantSignUpPage implements OnInit {

  day: number;
  month: number;
  year: number;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // 1 to 31
  age: number = 0;
  // months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
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
  password: string = '';
  showPassword: boolean = false;


  constructor(private router: Router,) {

  }

  ngOnInit(): void {

  }

  onChangeDayDateYear(): void {
    const birthDate: any = new Date(this.year, this.month - 1, this.day);
    const currentDate: any = new Date();

    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / 3.15576e+10);

    this.age = ageInYears;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgDisplay = e.target.result; // Display the selected image immediately
      };
      reader.readAsDataURL(file);
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
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e)
  }

  redirectToSignIn(): void {
    this.router.navigate(['/pages/auth/compliant-sign-in']);
  }

}
