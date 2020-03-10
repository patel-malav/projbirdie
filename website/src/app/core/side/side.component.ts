import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CanvasService } from "src/app/explore/canvas/canvas.service";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { map } from "rxjs/operators";

@Component({
  selector: "pb-side",
  templateUrl: "./side.component.html",
  styleUrls: ["./side.component.scss"]
})
export class SideComponent implements OnInit {
  public term: string;
  public case: string = "search";
  public search$: Observable<any>;
  public observation$: Observable<any>;
  public taxanomy$: Observable<any>;

  constructor(private apollo: Apollo, private canvasServ: CanvasService) {}

  ngOnInit(): void {}

  search(value: string) {
    this.search$ = this.apollo
      .query<any>({
        query: gql`{search(term: "${value}"){taxaId name {common sci} image}}`
      })
      .pipe(map(resp => resp.data.search));
      this.case = 'search';
  }

  taxanomy(id: number) {
    console.log(id);
    this.taxanomy$ = this.apollo
      .query<any>({ query: gql`{taxanomy(id:${id}){id name{common sci}image{id medium}}}` })
      .pipe(map(resp => resp.data.taxanomy));
    this.case = 'taxanomy';
    // this.apollo
    // .query<any>({query: gql`{}`})
  }

  observation(id: number) {
    this.observation$ = this.apollo
      .query<any>({
        query: gql`{observation(id:${id}){id user{id name}geo{lat long}images{id medium}}}`
      })
      .pipe(map(resp => resp.data.observation));
    // this.canvasServ.showObservation(id);
  }
}
