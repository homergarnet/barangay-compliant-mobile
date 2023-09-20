import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutPage } from './_layout/layout.page';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    LayoutPage
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
