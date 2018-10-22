import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  NgxPaginationModule
} from 'ngx-pagination';

import {
  AppComponent
} from './app.component';
import {
  PlanetsComponent
} from './planets/planets.component';
import {
  EachPlanetComponent
} from './eachPlanet/eachPlanet.component';

const routes: Routes = [{
    path: '',
    component: PlanetsComponent
  },
  {
    path: 'planet/:id',
    component: EachPlanetComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent,
    EachPlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
