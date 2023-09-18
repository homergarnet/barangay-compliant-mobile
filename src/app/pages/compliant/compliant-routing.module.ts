import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrimePage } from './crime/crime.page';
import { CompliantPage } from './compliant/compliant.page';
import { LocationPage } from './location/location.page';
import { AnnouncementPage } from './announcement/announcement.page';

const routes: Routes = [
  {
    path: 'crime',
    component: CrimePage,
  },
  {
    path: 'compliant',
    component: CompliantPage,
  },
  {
    path: 'location',
    component: LocationPage,
  },
  {
    path: 'announcement',
    component: AnnouncementPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompliantRoutingModule { }