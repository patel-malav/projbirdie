import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  bird = {
    name: 'parrot',
    geo: {
      lat: -30.5595,
      long: 22.9375
    }
  }

  constructor() {
    console.log('Data Service Started...');
  }
}
