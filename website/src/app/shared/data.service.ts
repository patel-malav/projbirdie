import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private apollo: Apollo) {
    console.log(`DataService Started...`);
  }

  public getObservation(id: string) {
    return this.apollo.query<any>({
      query: gql`{observation(id: ${id}){id user{id name} bird{id} geo{lat long} images{id url}}}`
    }).pipe(map(resp => {
      if(resp.data) {
        resp.data.observation.images[0].url = resp.data.observation.images[0].url.replace('square', 'medium');
        return resp.data.observation;  
      } else {
        console.log(resp);
        return null;
      }
    }));
  }
}
