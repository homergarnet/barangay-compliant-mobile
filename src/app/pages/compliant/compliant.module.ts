import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompliantRoutingModule } from './compliant-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompliantPage } from './compliant/compliant.page';
import { CrimePage } from './crime/crime.page';
import { LocationPage } from './location/location.page';
import { AnnouncementPage } from './announcement/announcement.page';


@NgModule({
  declarations: [
    CompliantPage,
    CrimePage,
    LocationPage,
    AnnouncementPage
  ],
  imports: [
    SharedModule,
    CompliantRoutingModule
  ]
})
export class CompliantModule { }
