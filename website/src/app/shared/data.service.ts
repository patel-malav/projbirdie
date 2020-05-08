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
  public color = new Map<string, Map<number, number>>();

  constructor(private apollo: Apollo) {
    let quantity = new Map<number, number>();
    quantity.set(-1, 0xffffcc);
    quantity.set(0, 0xe3e302);
    quantity.set(1, 0xfcfc03);
    quantity.set(2, 0xfdfd0d);
    quantity.set(3, 0xfdfd1c);
    quantity.set(4, 0xfdfd35);
    quantity.set(5, 0xfdfd4e);
    quantity.set(6, 0xfdfd68);
    quantity.set(7, 0xfefe81);
    quantity.set(8, 0xfefe9a);
    quantity.set(9, 0xfefeb3);
    quantity.set(10, 0xffff00);
    this.color.set("quantity", quantity);

    this.reqCount$.next(++this.reqCount);
    this.font = fetch("/assets/optimer_regular.typeface.json")
      .then((data) => data.json())
      .then((data) => {
        this.reqCount$.next(--this.reqCount);
        return new FontLoader().parse(data);
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
    let data = await fetch("/assets/" + path).then((data) =>
      data.arrayBuffer()
    );
    this.reqCount$.next(--this.reqCount);
    let obj = new OBJLoader2().parse(data);
    obj.scale.set(6, 6, 6);
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
