import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    console.log(`DataService Started...`);
  }

  public getObservation(id: string) { }
}
