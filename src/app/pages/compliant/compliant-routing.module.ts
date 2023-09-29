import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrimePage } from './crime/crime.page';
import { CompliantPage } from './compliant/compliant.page';
import { LocationPage } from './location/location.page';
import { AnnouncementPage } from './announcement/announcement.page';
import { ProfileInformationPage } from './profile-information/profile-information.page';
import { HomePage } from './home/home.page';
import { CompliantGuard } from '../auth/guards/compliant.guard';
import { ReportHistoryPage } from './report-history/report-history.page';

const routes: Routes = [
  {
    path: 'crime',
    component: CrimePage,
    canActivate: [CompliantGuard]
  },
  {
    path: 'compliant',
    component: CompliantPage,
    canActivate: [CompliantGuard]
  },
  {
    path: 'location',
    component: LocationPage,
    canActivate: [CompliantGuard]
  },
  {
    path: 'announcement',
    component: AnnouncementPage,
    canActivate: [CompliantGuard]
  },
  {
    path: 'profile-information',
    component: ProfileInformationPage,
    canActivate: [CompliantGuard]
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [CompliantGuard]
  },
  {
    path: 'report-history',
    component: ReportHistoryPage,
    canActivate: [CompliantGuard]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompliantRoutingModule { }
