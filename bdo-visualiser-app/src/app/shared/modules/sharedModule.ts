import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../../layout/page/page.module';
import { PageComponent } from '../../layout/page/page.component';
import { PageHeaderComponent } from '../../layout/page/page-header/page-header.component';
import { Globals } from '../classes/globals';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { DateLongPipe } from '../pipes/date-long.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ServerModule } from 'src/server/src/serverModule';

@NgModule({
  imports: [
    CommonModule,
    PageModule,
    NgxUiLoaderModule,
    ServerModule
  ],
  declarations: [
    DateLongPipe
  ],
  exports: [
    PageComponent,
    PageHeaderComponent,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
    DateLongPipe
  ],
  providers: [
    Globals,
    MessageService,
    MultiSelectModule,
    DateLongPipe
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule
    }
  }
}
