import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './modules/home/overview/overview.component';
import { CombatPageComponent } from './modules/combat/combat-page/combat-page.component';
import { LifePageComponent } from './modules/life/life-page/life-page.component';
import { MapPageComponent } from './modules/map/map-page/map-page.component';
import { FailStacksPageComponent } from './modules/fail-stacks/fail-stacks-page/fail-stacks-page.component';

const routes: Routes = [
  { path: 'home', component: OverviewComponent, data: {page: 'home'} },
  { path: 'combat', component: CombatPageComponent, data: {page: 'combat'} },
  { path: 'life', component: LifePageComponent, data: {page: 'life'} },
  { path: 'map', component: MapPageComponent, data: {page: 'map'} },
  { path: 'fail-stacks', component: FailStacksPageComponent, data: {page: 'fail-stacks'} },
  { path: '**', redirectTo:'home', data: {page: 'home'} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
