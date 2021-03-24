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
import { LoadingService } from './shared/services/loading.service';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

/*
  bgs = bottomRight Small loader
  fgs = main center loader
  pb = top bar loader
*/
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#66b3ff',
  bgsPosition: POSITION.bottomRight,
  bgsSize: 100,
  bgsType: SPINNER.wanderingCubes,
  bgsOpacity: 0.8,
  fgsColor: '#66b3ff',
  fgsPosition: POSITION.centerCenter,
  fgsType: SPINNER.cubeGrid,
  fgsSize: 150,
  pbColor: '#66b3ff',
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 20
};

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
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    APIService ,
    MessageService,
    LoadingService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
