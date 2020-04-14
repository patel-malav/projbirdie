import { Injectable, OnDestroy } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { DocumentNode } from "graphql";
import { map } from "rxjs/operators";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";
import { FontLoader, Font } from "three";

@Injectable()
export class DataService implements OnDestroy {
  private subs: Subscription[] = [];
  private reqCount = 0;
  public reqCount$ = new Subject<number>();
  public font: Promise<Font>;

  constructor(private apollo: Apollo) {
    this.reqCount$.next(++this.reqCount);
    this.font = fetch('/assets/optimer_regular.typeface.json')
    .then(data => data.json())
    .then(data => {
      this.reqCount$.next(--this.reqCount);
      return new FontLoader().parse(data)
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  /**
   *
   * @param path Relative to assets/
   */
  public async object(path: string) {
    this.reqCount$.next(++this.reqCount);
    let data = await fetch('/assets/' + path).then(data => data.arrayBuffer());
    this.reqCount$.next(--this.reqCount);
    let obj = new OBJLoader2().parse(data);
    obj.scale.set(6,6,6);
    return obj;
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
