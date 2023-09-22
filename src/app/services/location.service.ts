import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AgentId: 'none',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  API_URL: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getLocationList(keyword: string = '', page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-location?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);

  }

  receiveCrimeList(reportType: string = '', status: string = '', keyword: string = '', page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-manage-crime?reportType=${reportType}&status=${status}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);

  }

}
