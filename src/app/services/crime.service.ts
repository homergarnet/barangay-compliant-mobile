import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' ,
    'AgentId' : 'none',

  })
};


@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  crimeCompliantList(keyword: string = '', page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-crime-compliant?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);

  }

  createCaseReport(fileParams: any, crimeForm: any): Observable<any> {

    httpOptions.headers = httpOptions.headers.delete("Content-type");
    // console.log("fileParams: ", fileParams)
    const formData: any = new FormData();
    if (fileParams["Files"]) {

      fileParams["Files"].forEach((file: any) => {

        formData.append("CrimeImage", file);

      });

      formData.append("CrimeCompliantId", crimeForm.crimeCompliantId);
      formData.append("Description", crimeForm.description);
      // delete file field to prevent serialization error in API
      delete fileParams["Files"];

    }

    return this.http.post(this.API_URL + `api/create-case-report`, formData, httpOptions);

  }

}
