import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({providedIn: 'root'})
export class CanvasService {

  observations$ = new Subject<{[key:string]: string}>();

  constructor(private data: DataService, private apollo: Apollo) { }

  showObservation(id: string) {
    console.log(`Show Me Observation - ${id}`);
    this.data.getObservation(id).subscribe(resp => {
      // console.log(resp); # There are various fields to consider.
      this.observations$.next(resp.geo);
    })
  }
}
