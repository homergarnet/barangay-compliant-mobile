// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapsApiKey: 'AIzaSyCDqwAgErq1u7LfsyvdRVm14Fn7baGH1vU',
  imgNoImageDisplay: '/assets/images/no-image.png',
  // apiUrl: 'sci284625-001-site1.anytempurl.com/',
  apiUrl: 'http://localhost:8001/',
  // signalRHub: 'sci284625-001-site1.anytempurl.com/chatHub',
  signalRHub: 'http://localhost:8001/chatHub',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
