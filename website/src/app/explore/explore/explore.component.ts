import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subject, Subscription, from, of, asyncScheduler } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { ExploreService } from "../explore.service";
import { Earth } from "../three/earth.object";
import { DataService } from "src/app/shared/data.service";
import gql from "graphql-tag";
import { Country } from "../three/country.object";

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
  private earth = new Earth();

  constructor(private explore: ExploreService, private data: DataService) {}

  ngOnInit(): void {
    this.explore.setCanvas = this.canvas.nativeElement;
    this.explore.start();
    let resize_sub = this.resize$.subscribe((event) => this.change(event));
    this.subs.push(resize_sub);

    this.explore.addObject(this.earth, "scene");
    this.loadCountries();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.explore.stop();
  }

  private change(event: any) {
    this.explore.resize(event.newWidth - 16, event.newHeight);
  }

  private loadCountries() {
    this.data.query<any>(gql`{countries{cid model}}`)
    .pipe(switchMap(res => of(...res.data.countries, asyncScheduler)))
    .subscribe((country) => {
      let obj = new Country(country.cid, Math.floor(Math.random() * 10));
      this.explore.addObject(obj, "Earth");
      if(country.model) {
        this.data.object(country.model, this.earth)
        .then(model => obj.addMesh(model));
      }
    }).add(() => {
      console.log('DONE', this.earth);
    })
  }
}
