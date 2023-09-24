import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GoogleMapsService } from '../../../services/google-maps.service';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { LocationService } from 'src/app/services/location.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  center = { lat: 15.7081, lng: 120.3692 };
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
  isPresentActionSheet: boolean = false;

  currentPage: number = 1;
  resultPerPage: number = 10;

  locationForm: FormGroup = new FormGroup({
    locationDescriptionDropdown: new FormControl(''),
  });

  latLong = { lat: 0, lng: 0 };
  isUpdateLocation: boolean = false;

  locationDropdownList: any = [];

  constructor(
    private gmaps: GoogleMapsService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController,
    private toastrCustomService: ToastrCustomService,
    private spinner: NgxSpinnerService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.initialDescriptionList();
  }

  initialDescriptionList(
    currentPageVal: number = 1,
    resultPerPageVal: number = 3
  ): void {
    this.spinner.show();

    this.locationService
      .receiveCrimeList(
        '',
        '',
        '',
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;

          console.log('result: ', result);
          this.locationDropdownList = result;
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Error',
            text: error,
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
      );
  }

  onChangeLocationDropdown(): void {

    //for removing markers
    if (this.markers.length != 0) {
      this.markers[0].setMap(null);
      this.markers.splice(0, 1);
    }
    this.locationService
      .getLocationList(this.locationDescriptionDropdown?.value, 1, 10)
      .subscribe(
        (res) => {
          let result: any = res;
          console.log('LATLONG: ', result);
          if (result.length >= 1) {
            this.isUpdateLocation = true;
            this.latLong.lat = result[0].Lat;
            this.latLong.lng = result[0].Long;
            let googleMaps: any = this.googleMaps;
            const icon = {
              url: 'assets/icon/location-pin.png',
              scaledSize: new googleMaps.Size(50, 50),
            };
            const marker = new googleMaps.Marker({
              position: { lat: this.latLong.lat, lng: this.latLong.lng },
              map: this.map,
              icon: icon,
              // draggable: true,
              animation: googleMaps.Animation.DROP,
            });
            this.markers.push(marker);
          }

          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Error',
            text: error,
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
      );
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 12,
      });
      this.renderer.addClass(mapEl, 'visible');
      // this.addMarker(location);
      this.onMapClick();
    } catch (e) {
      console.log(e);
    }
  }

  onMapClick() {
    this.mapClickListener = this.googleMaps.event.addListener(
      this.map,
      'click',
      (mapsMouseEvent) => {

        //for removing markers
        if (this.markers.length != 0) {
          this.markers[0].setMap(null);
          this.markers.splice(0, 1);
        }

        console.log('here: na: ', mapsMouseEvent);
        console.log(mapsMouseEvent.latLng.toJSON());
        this.latLong = mapsMouseEvent.latLng.toJSON();
        console.log(mapsMouseEvent.latLng);
        this.addMarker(mapsMouseEvent.latLng);
      }
    );
  }

  addMarker(location) {
    if (this.isUpdateLocation == true) {
      //update location
      this.spinner.show();

      this.locationService.updateLocation(this.locationForm.getRawValue(), this.latLong).subscribe(
        (res) => {
          let result: any = res;

          console.log('result: ', result);
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Error',
            text: error,
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
      );
    } else {

      this.isUpdateLocation = true;
      //create location
      this.spinner.show();

      this.locationService
        .createLocation(this.locationForm.getRawValue(), this.latLong)
        .subscribe(
          (res) => {
            let result: any = res;

            console.log('result: ', result);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            Swal.fire({
              title: 'Error',
              text: error,
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
        );
    }
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icon/location-pin.png',
      scaledSize: new googleMaps.Size(50, 50),
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      // draggable: true,
      animation: googleMaps.Animation.DROP,
    });
    this.markers.push(marker);

    if (this.isPresentActionSheet) {
      this.presentActionSheet();
    }

    this.isPresentActionSheet = true;
    this.markerClickListener = this.googleMaps.event.addListener(
      marker,
      'click',
      () => {
        console.log('markerclick', marker);
        this.checkAndRemoveMarker(marker);
        console.log('markers: ', this.markers);
      }
    );
  }

  checkAndRemoveMarker(marker) {
    const index = this.markers.findIndex(
      (x) =>
        x.position.lat() == marker.position.lat() &&
        x.position.lng() == marker.position.lng()
    );
    console.log('is marker already: ', index);
    if (index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Added Marker',
      subHeader: '',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Save',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  ngOnDestroy() {
    // this.googleMaps.event.removeAllListeners();
    if (this.mapClickListener)
      this.googleMaps.event.removeListener(this.mapClickListener);
    if (this.markerClickListener)
      this.googleMaps.event.removeListener(this.markerClickListener);
  }

  get locationDescriptionDropdown() {
    return this.locationForm.get('locationDescriptionDropdown');
  }
}
