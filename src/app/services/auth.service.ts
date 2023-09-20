import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' ,
    'AgentId' : 'none',

  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = environment.apiUrl;

  private authLocalStorageToken = 'MARKET_PLACE_USER';
  public loginTypeSubject$ = new BehaviorSubject<string>('');

  constructor(

    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  userRegistration(compliantSignUpForm:any, validIdFile: any, selfieIdFile: any): Observable<any> {

    httpOptions.headers = httpOptions.headers.delete("Content-type");

    const formData: any = new FormData();
    let BirthDate = new Date(compliantSignUpForm.birthYear, compliantSignUpForm.birthMonth, compliantSignUpForm.birthDay);
    formData.append('ValidId', validIdFile);
    formData.append('SelfieId', selfieIdFile);
    formData.append('Username', compliantSignUpForm.username);
    formData.append('Password', compliantSignUpForm.password);
    formData.append('FirstName', compliantSignUpForm.firstName);
    formData.append('MiddleName', compliantSignUpForm.middleName);
    formData.append('LastName', compliantSignUpForm.lastName);
    formData.append('BirthDate', BirthDate);
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

    return this.http.post(this.API_URL + `api/create-personal-info`, formData, httpOptions);

  }

}
