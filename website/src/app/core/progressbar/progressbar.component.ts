import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';

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
  private subs: Subscription[] = [];
  public value = 100;
  public mode = Mode.Determinate;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    let sub = this.data.reqCount$.pipe(debounceTime(50)).subscribe((count) => {
      if (count === 0) this.mode = Mode.Determinate;
      else this.mode = Mode.Indeterminate;
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
