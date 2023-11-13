import { Component, OnInit } from '@angular/core';
import {
  LocalNotifications,
  ScheduleOptions,
} from '@capacitor/local-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
})
export class AnnouncementPage implements OnInit {
  announcements = [];
  announcementList: any = [];
  currentPage: number = 1;
  resultPerPage: number = 10;
  totalAnnouncementCount: number = 0;

  constructor(
    private announcementService: AnnouncementService,
    private toastrCustomService: ToastrCustomService,
    private spinner: NgxSpinnerService,
    private signalRService: SignalrService
  ) {
    this.loadData(null);
  }

  ngOnInit(): void {
    this.initialAnnouncement();
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

  initialAnnouncement(
    currentPageVal: number = 1,
    resultPerPageVal: number = 3
  ): void {
    this.spinner.show();

    this.announcementService
      .announcementList(
        '',
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;
          this.totalAnnouncementCount = result.AnnouncementTotalCount;
          // console.log("result: ", result)
          result.AnnouncementDescription.forEach((item, index) => {
            this.announcementList.push({
              Id: item.Id,
              Description: item.Description,
              DateTimeCreated: item.DateTimeCreated,
            });
          });
          this.currentPage++;

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

  loadData(event) {
    // Simulate loading data from an API or other source
    setTimeout(() => {
      this.initialAnnouncement(0);

      if (event) {
        event.target.complete();
      }

      if (this.currentPage >= this.totalAnnouncementCount / 3) {
        event.target.disabled = true;
      }

      this.currentPage++;
    }, 1000);
  }
}
