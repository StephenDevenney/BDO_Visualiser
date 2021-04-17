import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageModule } from './page/page.module';
import { SidenavService } from './sidenav/sidenav.service';
import { ServerModule } from 'src/server/src/serverModule';



@NgModule({
  imports: [
    CommonModule,
    PageModule,
    ServerModule
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
