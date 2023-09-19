import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutPage } from './_layout/layout.page';
import { SharedModule } from './shared/shared.module';
import { FooterPage } from './_layout/components/footer/footer.page';

@NgModule({
  declarations: [
    LayoutPage,
    FooterPage
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
