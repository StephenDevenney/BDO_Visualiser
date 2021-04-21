import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from './page/page.module';
import { ServerModule } from 'src/server/src/serverModule';



@NgModule({
  imports: [
    CommonModule,
    PageModule,
    ServerModule
  ],
  declarations: [
    
  ],
  exports: [
    
  ],
  providers: [
    
  ]
})
export class LayoutModule { }
