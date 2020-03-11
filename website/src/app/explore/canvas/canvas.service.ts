import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({providedIn: 'root'})
export class CanvasService {

  /**
   * Show Observation by giving lat & long arguments.
   */
  observation$ = new Subject<{lat: number, long: number}>();
  /**
   * Clear The Observation from the globe by id or "all" to
   * remove everything.
   */
  clear$ = new Subject<string>();

  constructor(private apollo: Apollo) { }

  // showObservation(id: string) {
    // console.log(`Show Me Observation - ${id}`);
    // this.data.getObservation(id).subscribe(resp => {
    //   // console.log(resp); # There are various fields to consider.
    //   this.observations$.next(resp.geo);
    // })
  // }
}
