import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LocalNotifications,
  ScheduleOptions,
} from '@capacitor/local-notifications';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private signalRService: SignalrService) {}

  ngOnInit() {
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

  redirectToCrime() {
    this.router.navigate(['/pages/compliant/crime']);
  }

  redirectToCompliant() {
    this.router.navigate(['/pages/compliant/compliant']);
  }

  redirectToLocation() {
    this.router.navigate(['/pages/compliant/location']);
  }

  redirectToAnnouncement() {
    this.router.navigate(['/pages/compliant/announcement']);
  }
}
