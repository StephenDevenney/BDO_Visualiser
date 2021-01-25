import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DropdownHeaderComponent } from './dropdown-header/dropdown-header.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SidebarModule } from 'primeng/sidebar';
import { PageService } from './page.service';
import { DropdownModule } from 'primeng/dropdown';
// import { SharedModule } from 'primeng/api';
// import { SharedModule } from '../../shared/modules/sharedModule';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ClickOutsideDirective } from '../../shared/directives/clickOutsideDirective';

@NgModule({
  declarations: [
    PageComponent, 
    PageHeaderComponent, 
    DropdownHeaderComponent,
    PreferencesComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    SidebarModule,
    DropdownModule,
    FormsModule,
    ToastModule
  ],
  exports: [
    PageComponent,
    PageHeaderComponent
  ],
  providers: [
    PageService
  ]
})
export class PageModule { 
  static forRoot(): ModuleWithProviders<PageModule> {
    return {
      ngModule: PageModule
    }
  }
}
