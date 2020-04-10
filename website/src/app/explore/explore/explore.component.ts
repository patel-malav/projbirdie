import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { ExploreService } from "../explore.service";

@Component({
  selector: "pb-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"],
})
export class ExploreComponent implements OnInit, OnDestroy {
  @ViewChild("canvas", { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;

  public resize$ = new Subject<any>();
  private subs: Subscription[] = [];

  constructor(private exploreService: ExploreService) {}

  ngOnInit(): void {
    this.exploreService.setCanvas = this.canvas.nativeElement;
    this.exploreService.start();
    let sub = this.resize$.subscribe((event) => this.change(event));
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.exploreService.stop();
  }

  private change(event: any) {
    this.exploreService.resize(event.newWidth - 16, event.newHeight);
  }
}
