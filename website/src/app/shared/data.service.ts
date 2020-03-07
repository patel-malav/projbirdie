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
      query: gql`{observation(id: ${id}){id user{id name} bird{id} geo{lat long} images{url}}}`
    }).pipe(map(resp => {return resp.data.observation}));
  }
}
