import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompliantRoutingModule } from './compliant-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompliantPage } from './compliant/compliant.page';
import { CrimePage } from './crime/crime.page';
import { LocationPage } from './location/location.page';
import { AnnouncementPage } from './announcement/announcement.page';
import { ProfileInformationPage } from './profile-information/profile-information.page';
import { FooterPage } from '../_layout/components/footer/footer.page';
import { HomePage } from './home/home.page';


@NgModule({
  declarations: [
    HomePage,
    CompliantPage,
    CrimePage,
    LocationPage,
    AnnouncementPage,
    ProfileInformationPage,
    FooterPage
  ],
  imports: [
    SharedModule,
    CompliantRoutingModule
  ]
})
export class CompliantModule { }
