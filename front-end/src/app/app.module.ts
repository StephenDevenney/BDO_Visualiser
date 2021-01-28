import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RedirectToComponent } from './shared/components/redirect-to/redirectTo.component';
import { SharedModule } from './shared/modules/sharedModule';
import { APIInterceptor } from './shared/classes/api.interceptor';
import { AuthService } from './shared/services/auth.service';
import { APIService } from './shared/services/api.service';
import { HomeModule} from './modules/home/home.module';
import { CombatModule } from './modules/combat/combat.module';
import { LifeModule } from './modules/life/life.module';
import { MapModule } from './modules/map/map.module';
import { FailStacksModule } from './modules/fail-stacks/fail-stacks.module';
import { MessageService } from 'primeng/api';
import { TableInsertComponent } from './shared/components/table-insert/table-insert.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectToComponent,
    TableInsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    CombatModule,
    LifeModule,
    MapModule,
    FailStacksModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    APIService ,
    MessageService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
