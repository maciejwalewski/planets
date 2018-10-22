import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-eachPlanet',
  templateUrl: './eachPlanet.component.html',
  styleUrls: ['./eachPlanet.component.scss']
})
export class EachPlanetComponent implements OnInit, OnDestroy {
  planet: object = {};
  id: number;
  private sub: any;
  loadingPlanet: boolean = false;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.fetchPlanet();
  }

  fetchPlanet() {
    this.loadingPlanet = true;
    this.httpClient.get(`https://swapi.co/api/planets/${this.id}/`)
      .subscribe(
        (data: object) => {
          this.planet = data;
          console.log('Planet:', this.planet);
          this.loadingPlanet = false;
        }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
