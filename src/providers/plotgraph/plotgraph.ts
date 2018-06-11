import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlotgraphProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlotgraphProvider {
  data :any

  constructor(public http: HttpClient) {
    this.data = null;

    console.log('Hello PlotgraphProvider Provider');
  }

  load() 
  {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/').subscribe(data => {
        // Read the result field from the JSON response.
        this.data = data
        resolve(this.data)
      }
      , err => {
        console.log(err);
      });

    });
  }
  
}