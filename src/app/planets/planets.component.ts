import {
  Component
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent {
  //data
  nextData: object = {};
  results: any[] = [];
  url: string = 'https://swapi.co/api/planets/';
  searchValue: string = '';
  searchUrl: string = '';
  searchStarted: boolean = false;
  loadingData: boolean = false;

  //pagination
  pageNum: number = 1;
  planetsPerPage: number = 10;
  options: any[] = [{
      name: "5",
      value: 5
    },
    {
      name: "10",
      value: 10
    },
    {
      name: "25",
      value: 25
    },
    {
      name: "100",
      value: 100
    }
  ]

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  onKey(event) {
    this.searchValue = event.target.value;
    this.searchUrl = `https://swapi.co/api/planets/?search=${this.searchValue}`;
  }

  perPageChange(ev) {
    this.planetsPerPage = ev.target.value;
  }

  searchPlanet() {
    this.results = [];
    this.loadingData = true;
    if (!this.searchStarted && this.searchValue && this.searchValue.length && this.searchValue !== '') {
      this.httpClient.get(!this.searchStarted ? this.searchUrl : this.nextData["next"])
        .subscribe(
          (data: object) => {
            this.results = this.results.concat(data["results"]);
            this.searchStarted = true;
            this.nextData = data;
            if (this.nextData["next"] && this.nextData["next"].length) {
              this.searchPlanet();
            } else {
              console.log('Search results:', this.results);
              this.searchStarted = false;
              this.loadingData = false;
            }
          }
        )
    } else {
      this.fetchData();
    }
  }

  gotoPlanet(url) {
    let shortUrl = url.substring(0, url.length - 1);
    let planetNum = shortUrl.match(/\d+$/);
    let routerNum: number;
    if (planetNum) {
      routerNum = Number(planetNum[0]);
    }

    this.router.navigate(['/planet', routerNum]);
  }

  fetchData() {
    this.loadingData = true;
    this.httpClient.get(this.searchStarted === false ? this.url : this.nextData["next"])
      .subscribe(
        (data: object) => {
          this.results = this.results.concat(data["results"]);
          this.searchStarted = true;
          this.nextData = data;
          if (this.nextData["next"] && this.nextData["next"].length) {
            this.fetchData();
          } else {
            console.log('Results:', this.results);
            this.searchStarted = false;
            this.loadingData = false;
          }
        }
      )
  }
}
