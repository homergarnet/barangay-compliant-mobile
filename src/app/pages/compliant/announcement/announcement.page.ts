import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
})
export class AnnouncementPage implements OnInit {

  announcements = [];
  currentPage = 1;

  constructor() {
    this.loadData(null);
  }

  ngOnInit(): void {

  }

  loadData(event) {
    // Simulate loading data from an API or other source
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        this.announcements.push({
          title: `Announcement ${this.announcements.length + 1}`,
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        });
      }

      if (event) {
        event.target.complete();
      }

      if (this.currentPage >= 3) {
        event.target.disabled = true;
      }

      this.currentPage++;
    }, 1000);
  }

}
