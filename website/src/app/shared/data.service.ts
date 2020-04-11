import { Injectable, OnDestroy } from "@angular/core";
import { Subscription, BehaviorSubject, Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { DocumentNode } from "graphql";
import { map } from "rxjs/operators";

@Injectable()
export class DataService implements OnDestroy {
  private subs: Subscription[] = [];
  private reqCount = 0;
  public reqCount$ = new Subject<number>();

  constructor(private apollo: Apollo) {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public query<T>(query: DocumentNode, variables?: any) {
    this.reqCount$.next(++this.reqCount);
    return this.apollo
      .query<T>({ query, variables })
      .pipe(
        map((res) => {
          this.reqCount$.next(--this.reqCount);
          return res;
        })
      );
  }
}
