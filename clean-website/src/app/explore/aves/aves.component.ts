import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { ExploreService } from "../explore.service";

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
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.param = this.route.params;
    this.exploreService.test();
    // this.exploreService.testCube();
    // let sub = this.param.subscribe((data) => {
      // this.exploreService.testEarth();
    // });
    // this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
