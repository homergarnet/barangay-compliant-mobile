import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompliantSignInPage } from './compliant-sign-in/compliant-sign-in.page';
import { CompliantSignUpPage } from './compliant-sign-up/compliant-sign-up.page';

const routes: Routes = [

  {
    path: 'compliant-sign-in',
    component: CompliantSignInPage,
  },
  {
    path: 'compliant-sign-up',
    component: CompliantSignUpPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
