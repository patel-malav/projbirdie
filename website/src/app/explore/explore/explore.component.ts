import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subject, Subscription, of, asyncScheduler } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ExploreService } from "../explore.service";
import { Earth } from "../three/earth.object";
import { DataService } from "src/app/shared/data.service";
import gql from "graphql-tag";
import { Country } from "../three/country.object";
import { Text } from "../three/text.mesh";
import { Vector3 } from "three";

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

  constructor(private explore: ExploreService, private data: DataService) {}

  ngOnInit(): void {
    this.explore.setCanvas = this.canvas.nativeElement;
    this.explore.start();
    let resize_sub = this.resize$.subscribe((event) => this.change(event));
    this.subs.push(resize_sub);

    if (!this.explore.hasObject("Earth")) {
      let earth = new Earth();
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
    this.data
      .query<any>(
        gql`
          {
            countries {
              cid
              model
              level
              name
              display_size
              zoom_level
            }
          }
        `
      )
      .pipe(switchMap((res) => of(...res.data.countries, asyncScheduler)))
      .subscribe(async ($country) => {
        let country = new Country($country.cid, $country.level);
        this.explore.addObject(country);
        if ($country.model) {
          country.addSurfaceBody = await this.data.object($country.model);
          country.changeColor = this.data.color
            .get("quantity")
            .get($country.level);
          let config = {
            pos: new Vector3().copy(await country.center),
            zoom_level: $country.zoom_level,
            display_size: $country.display_size,
          };
          let nameMesh = new Text($country.name, await this.data.font, config);
          country.add(nameMesh);
        }
      });
  }
}
