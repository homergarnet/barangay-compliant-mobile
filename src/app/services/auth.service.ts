import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AgentId: 'none',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = environment.apiUrl;
  helper: any = new JwtHelperService();

  public loginTypeSubject$ = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  userRegistration(
    compliantSignUpForm: any,
    validIdFile: any,
    selfieIdFile: any
  ): Observable<any> {
    httpOptions.headers = httpOptions.headers.delete('Content-type');

    const formData: any = new FormData();
    let BirthDate = new Date(
      compliantSignUpForm.birthYear,
      compliantSignUpForm.birthMonth,
      compliantSignUpForm.birthDay
    );
    let currentDateFormatted = formatDate(BirthDate, 'yyyy-MM-dd', 'en-US');
    formData.append('ValidId', validIdFile);
    formData.append('SelfieId', selfieIdFile);
    formData.append('Username', compliantSignUpForm.username);
    formData.append('Password', compliantSignUpForm.password);
    formData.append('FirstName', compliantSignUpForm.firstName);
    formData.append('MiddleName', compliantSignUpForm.middleName);
    formData.append('LastName', compliantSignUpForm.lastName);
    formData.append('BirthDate', currentDateFormatted);
    formData.append('Gender', compliantSignUpForm.gender);
    formData.append('Phone', compliantSignUpForm.contactNumber);
    formData.append('HouseNo', compliantSignUpForm.houseNo);
    formData.append('Street', compliantSignUpForm.street);
    formData.append('Village', compliantSignUpForm.village);
    formData.append('UnitFloor', compliantSignUpForm.unitFloor);
    formData.append('Building', compliantSignUpForm.building);
    formData.append('ProvinceCode', compliantSignUpForm.province);
    formData.append('CityCode', compliantSignUpForm.cityMunicipality);
    formData.append('BrgyCode', compliantSignUpForm.barangay);
    formData.append('ZipCode', compliantSignUpForm.zipCode);
    formData.append('UserType', 'compliant');
    formData.append('ResidencyType', compliantSignUpForm.residencyType);
    formData.append('Email', compliantSignUpForm.email);

    return this.http.post(
      this.API_URL + `api/create-personal-info`,
      formData,
      httpOptions
    );
  }

  isAuthenticated(pageType: string): boolean {
    const token = localStorage.getItem(pageType + '_token') as string;
    let parseToken = JSON.parse(token);



    if (parseToken == null) {
      this.loginTypeSubject$.next('');
      return false;
    } else if (this.helper.isTokenExpired(parseToken)) {
      this.loginTypeSubject$.next('');
      this.clearSession(pageType);

      if (pageType == 'compliant') {
        this.router.navigate(['/pages/auth/compliant-sign-in'], {
          queryParams: {},
        });
      }

      if (pageType == 'admin') {
        this.router.navigate(['/pages/auth/admin-sign-in'], {
          queryParams: {},
        });
      }

      if (pageType == 'barangay') {
        this.router.navigate(['/pages/auth/barangay-sign-in'], {
          queryParams: {},
        });
      }

      const isExpired = this.helper.isTokenExpired(parseToken);
      return isExpired;
    } else {
      this.loginTypeSubject$.next(pageType);
      const isExpired = this.helper.isTokenExpired(parseToken);
      return !isExpired;
    }
  }

  clearSession(pageType: string): void {
    localStorage.removeItem(pageType + "_token");
  }

  redirectToPage(pageType: string): void {

    const isAuthenticated = this.isAuthenticated(pageType);

    if (isAuthenticated) {

      //to route back to previous route
      this.router.navigate(['/pages/' + pageType + '/home'], {
        relativeTo: this.activatedRoute,
      });

    }
  }

  getAccessToken(
    Username: string,
    Password: string,
    UserType: string
  ): Observable<any> {
    return this.http.post(
      this.API_URL + 'api/login',
      { Username, Password, UserType },
      { ...httpOptions, responseType: 'text' }
    );
  }

  sendForgotPassword(
    ToEmail: string,

  ): Observable<any> {
    return this.http.post(
      this.API_URL + 'api/send',
      { ToEmail },
      { ...httpOptions, responseType: 'text' }
    );
  }

  // JWT
  setSession(result: any, pageType: string): void {
    this.loginTypeSubject$.next(pageType);
    // const user: UserModel = jwt_decode(result.access_token);
    localStorage.setItem(pageType + '_token', JSON.stringify(result));
  }

  logout(pageType: string = '') {

    this.clearSession(pageType);
    this.loginTypeSubject$.next('');
    if(pageType == 'compliant'){

      this.router.navigate(['/pages/auth/compliant-sign-in'], { queryParams: {} });

    }

    // if(pageType == 'admin'){

    //   this.router.navigate(['/auth/admin-sign-in'], { queryParams: {} });

    // }

    // if(pageType == 'barangay'){

    //   this.router.navigate(['/auth/barangay-sign-in'], { queryParams: {} });

    // }

  }

}
