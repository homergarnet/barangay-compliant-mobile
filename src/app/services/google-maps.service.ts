import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) { }

  loadGoogleMaps(): Promise<any> {

    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsApiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });

  }

  getAddress(latitude: number, longitude: number) {
    const apiKey = environment.googleMapsApiKey;
    const latLng = `${latitude},${longitude}`;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${apiKey}`;
    // how to use this api
    // this.geocodingService.getAddress(latitude, longitude).subscribe((data: any) => {
    //   if (data.status === 'OK' && data.results.length > 0) {
    //     const address = data.results[0].formatted_address;
    //     console.log('Address:', address);
    //   } else {
    //     console.error('Unable to get address.');
    //   }
    // });
    return this.http.get(apiUrl);
  }

}
