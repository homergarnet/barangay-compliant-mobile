import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileInformationService } from 'src/app/services/profile-information.service';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.page.html',
  styleUrls: ['./profile-information.page.scss'],
})
export class ProfileInformationPage implements OnInit {

  API_URL: string = environment.apiUrl;
  userInformation: any = {
    FirstName: '',
    BirthDate: '',
    Gender: '',
    Phone: '',
    HouseNo: '',
    Street: '',
    Village: '',
    UnitFloor: '',
    Building: '',
    SelfieIdImage: '',

  };

  constructor(

    private profileInformation: ProfileInformationService,
    private authService: AuthService,
    private toastrCustomService: ToastrCustomService,
    private spinner: NgxSpinnerService,
    private signalRService: SignalrService

  ) { }

  ngOnInit() {

    this.initialProfileInformation();
    this.notification();

  }

  notification(): void {
    this.signalRService.message$.subscribe((message) => {
      let options: ScheduleOptions = {
        notifications: [
          {
            id: 111,
            title: 'reminder Notification',
            body: message,
            largeBody: message,
            summaryText: 'Exciting offers !!!',
          },
        ],
      };

      try {
        LocalNotifications.schedule(options);
      } catch (ex) {}
    });
  }

  initialProfileInformation(): void {

    this.spinner.show();

    this.profileInformation
      .getCurrentUserInformation(

      )
      .subscribe(
        (res) => {
          let result: any = res;
          this.userInformation = result;

          console.log("result: ", result)

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

  onCompliantLogout() {
    this.authService.logout('compliant');
  }



}
