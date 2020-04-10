import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { ExploreService } from "../explore.service";
import gql from "graphql-tag";
import { Apollo } from 'apollo-angular';

const test = gql`
  {
    hello
  }
`

@Component({
  selector: "pb-aves",
  templateUrl: "./aves.component.html",
  styleUrls: ["./aves.component.scss"],
})
export class AvesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public param: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private exploreService: ExploreService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.param = this.route.params;
    this.apollo.query({
      query: test
    }).subscribe(result => console.log(result.data));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
