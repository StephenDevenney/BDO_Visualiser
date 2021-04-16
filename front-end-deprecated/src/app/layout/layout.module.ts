import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageModule } from './page/page.module';
import { SidenavService } from './sidenav/sidenav.service';



@NgModule({
  imports: [
    CommonModule,
    PageModule
  ],
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent
  ],
  providers: [
    SidenavService
  ]
})
export class LayoutModule { }
