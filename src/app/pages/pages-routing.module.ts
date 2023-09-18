import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './_layout/layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [

      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },

      {
        path: 'compliant',
        loadChildren: () =>
          import('./compliant/compliant.module').then((m) => m.CompliantModule),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
