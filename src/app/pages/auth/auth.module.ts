import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompliantSignInPage } from './compliant-sign-in/compliant-sign-in.page';
import { CompliantSignUpPage } from './compliant-sign-up/compliant-sign-up.page';


@NgModule({
  declarations: [

    CompliantSignInPage,
    CompliantSignUpPage

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
