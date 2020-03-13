import * as THREE from "three";
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { EngineService } from "./engine.service";
import { Mesh, Vector3 } from "three";

@Component({
  selector: "pb-engine",
  templateUrl: "./engine.component.html",
  styleUrls: ["./engine.component.scss"]
})
export class EngineComponent implements OnInit, OnDestroy {
  @ViewChild("canvas", { static: true })
  public renderCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private engServ: EngineService) {}

  ngOnInit(): void {
    this.engServ.init(this.renderCanvas);
    this.engServ.animate();
    this.engServ.showEarth();
    this.engServ.showBird({id: 'malav', geo:{long: 77.20833, lat: 28.613889}});
  }

  ngOnDestroy(): void {
    this.engServ.stop();
  }
}
