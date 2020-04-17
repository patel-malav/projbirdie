import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subject, Subscription, of, asyncScheduler } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { ExploreService } from "../explore.service";
import { Earth } from "../three/earth.object";
import { DataService } from "src/app/shared/data.service";
import gql from "graphql-tag";
import { Country } from "../three/country.object";
import { Text } from "../three/text.mesh";
import { Mesh, Vector3 } from "three";

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

  constructor(private explore: ExploreService, private data: DataService) { }

  ngOnInit(): void {
    this.explore.setCanvas = this.canvas.nativeElement;
    this.explore.start();
    let resize_sub = this.resize$.subscribe((event) => this.change(event));
    this.subs.push(resize_sub);

    if(!this.explore.hasObject("Earth")) {
      let earth = new Earth();
      // earth.wireframe = true;
      this.explore.addObject(earth);
      this.loadCountries();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.explore.stop();
  }

  private change(event: any) {
    this.explore.resize(event.newWidth - 16, event.newHeight);
  }

  private loadCountries() {
    this.data.query<any>(gql`{countries{cid model level name displaySize zoomLevel}}`)
      .pipe(switchMap((res) => of(...res.data.countries, asyncScheduler)))
      .subscribe(async ({ cid, model: modelPath, level, name, displaySize, zoomLevel }) => {
        let obj = new Country(cid, level);
        this.explore.addObject(obj);
        if (modelPath) {
          let model = await this.data.object(modelPath);
          obj.addMesh(model);
          let font = await this.data.font;
          let nameMesh = new Text(name, font, new Vector3().copy(await obj.center), displaySize, zoomLevel);
          obj.add(nameMesh);
        }
      });
  }
}
