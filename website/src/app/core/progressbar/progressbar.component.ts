import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

enum Mode {
  Determinate = "determinate",
  Indeterminate = "indeterminate",
}

@Component({
  selector: "pb-progressbar",
  templateUrl: "./progressbar.component.html",
  styleUrls: ["./progressbar.component.scss"],
})
export class ProgressbarComponent implements OnInit, OnDestroy {
  private subs: Subscription[]  = [];
  public value = 100;
  public mode = Mode.Determinate;
  constructor(private data: DataService) {
    let sub = data.reqCount$.subscribe((count) => {
      if (count === 0) this.mode = Mode.Determinate;
      else this.mode = Mode.Indeterminate;
    });
    this.subs.push(sub);
  }
  ngOnInit(): void {
    this.data.query(gql`{hello}`).subscribe((res) => console.log(res.data));
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
