import { Component } from "@angular/core";
import gql from 'graphql-tag';
import { DataService } from './shared/data.service';

@Component({
  selector: "pb-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "clean-website";
  constructor(public data: DataService) {
    // data.query(gql`{hello}`).subscribe(res => console.log(res.data));
  }
}
