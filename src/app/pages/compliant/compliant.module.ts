import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { AgePipe } from 'src/app/pipes/age.pipe';


@NgModule({
  declarations: [
    HomePage,
    CompliantPage,
    CrimePage,
    LocationPage,
    AnnouncementPage,
    ProfileInformationPage,
    FooterPage,
    AgePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    CompliantRoutingModule
  ]
})
export class CompliantModule { }
