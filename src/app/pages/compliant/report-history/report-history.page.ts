import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from 'src/app/services/location.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.page.html',
  styleUrls: ['./report-history.page.scss'],
})
export class ReportHistoryPage implements OnInit {
  receiveCrimeList: any[] = [];
  receiveCrimeFilteredList: any[] = [];

  currentPage: number = 1;
  resultPerPage: number = 10;
  thisPageFirstResult: number = (this.currentPage - 1) * this.resultPerPage;
  numberOfPages: number = 0;
  numberOfPagesArr: any;
  constructor(
    private locationService: LocationService,
    private toastrCustomService: ToastrCustomService,
    private spinner: NgxSpinnerService,
    private signalRService: SignalrService
  ) {}

  ngOnInit() {
    this.initialReceiveCrimeList();
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

  initialReceiveCrimeList(
    currentPageVal: number = 1,
    resultPerPageVal: number = 10
  ) {
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
          this.receiveCrimeList = result;
          this.receiveCrimeFilteredList = result;

          // console.log('this.receiveCrimeList: ', this.receiveCrimeList);
          this.numberOfPages = Math.ceil(
            this.receiveCrimeList.length / this.resultPerPage
          );

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

  async paginationUpdateList() {
    const firstData = await this.initialReceiveCrimeList(this.currentPage);

    this.thisPageFirstResult = (this.currentPage - 1) * this.resultPerPage;
    this.receiveCrimeFilteredList = this.receiveCrimeList.slice(
      this.thisPageFirstResult,
      this.resultPerPage * this.currentPage
    );
    this.numberOfPages = Math.ceil(
      this.receiveCrimeList.length / this.resultPerPage
    );
    // [0,1,2,3,4]
    this.numberOfPagesArr = Array(this.numberOfPages)
      .fill(this.numberOfPages)
      .map((x, i) => i);

  }

  onMinusCurrentPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginationUpdateList();
    } else {
      this.currentPage = 1;
    }
  }

  onClickcurrentPage(num: number): void {
    this.currentPage = num;
    this.paginationUpdateList();
  }

  onAddCurrentPage(): void {
    if (this.currentPage != this.numberOfPages || this.numberOfPages == 1) {
      this.currentPage++;
      this.paginationUpdateList();
    }
  }
}
