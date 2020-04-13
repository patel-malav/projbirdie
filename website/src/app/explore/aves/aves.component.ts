import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import gql from "graphql-tag";
import { DataService } from "src/app/shared/data.service";
import { ExploreService } from "../explore.service";

interface Params {
  term: string;
}

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
    private data: DataService,
    private explore: ExploreService
  ) {}

  ngOnInit(): void {
    let sub = this.route.params
      .pipe(
        switchMap(({ term }: Params) =>
          this.data.query(
            gql`
              {
                hello
              }
            `
          )
        )
      )
      .subscribe((data) => console.log(data));
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
