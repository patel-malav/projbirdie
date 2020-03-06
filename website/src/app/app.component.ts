import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'website';
  constructor(private apollo: Apollo) {
    // apollo.query({
    //   query: gql`
    //   {
    //     observation(id: 32860312) {
    //       id user {id name} bird {id}
    //       geo {lat long} images {id url}
    //     }
    //   }
    //   `
    // }).subscribe((data) => {
    //   console.log(data);
    // })
  }
}
