import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './modules/home/overview/overview.component';
import { CombatPageComponent } from './modules/combat/combat-page/combat-page.component';
import { LifePageComponent } from './modules/life/life-page/life-page.component';
import { MapPageComponent } from './modules/map/map-page/map-page.component';
import { FailStacksPageComponent } from './modules/fail-stacks/fail-stacks-page/fail-stacks-page.component';
import { SignInComponent } from './modules/sign-in/sign-in/signin.component';
import { LandingPageComponent } from './modules/sign-in/landing-page/landingPage.component';
import { BarterPageComponent } from './modules/barter/barter/barter-page.component';
import { ScrollsPageComponent } from './modules/scrolls/scrolls/scrolls-page.component';
import { UserClassesPageComponent } from './modules/user-classes/user-classes/user-classes-page.component';
import { ClassCreationPageComponent } from './modules/user-classes/class-creation/class-creation-page.component';

const routes: Routes = [
  { path: 'home', component: OverviewComponent, data: {page: 'home'} },
  { path: 'combat', component: CombatPageComponent, data: {page: 'combat'} },
  { path: 'life', component: LifePageComponent, data: {page: 'life'} },
  { path: 'map', component: MapPageComponent, data: {page: 'map'} },
  { path: 'fail-stacks', component: FailStacksPageComponent, data: {page: 'fail-stacks'} },
  { path: 'sign-in', component: SignInComponent, data: {page: 'sign-in'} },
  { path: 'landing-page', component: LandingPageComponent, data: {page: 'landing-page'} },
  { path: 'barter', component: BarterPageComponent, data: {page: 'barter'} },
  { path: 'scrolls', component: ScrollsPageComponent, data: {page: 'scrolls'} },
  { path: 'user-classes', component: UserClassesPageComponent, data: {page: 'user-classes'} },
  { path: 'user-classes/creation', component: ClassCreationPageComponent, data: {page: 'user-classes/creation'} },
  { path: '**', redirectTo:'home', data: {page: 'home'} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
