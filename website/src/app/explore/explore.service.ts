import { Injectable, NgZone, OnDestroy } from "@angular/core";
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Light,
  DirectionalLight,
  Object3D,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Subject, Subscription } from "rxjs";
import { DataService } from "../shared/data.service";

@Injectable({
  providedIn: "root",
})
export class ExploreService implements OnDestroy {
  // Rxjs Subs
  private subs: Subscription[] = [];
  // Canvas
  private canvas$ = new Subject<HTMLCanvasElement>();
  // Three Globals
  private scene: Scene = new Scene();
  private camera: PerspectiveCamera = new PerspectiveCamera();
  private light: Light = new DirectionalLight();
  private renderer: WebGLRenderer;
  private control: OrbitControls;

  constructor(private ngZone: NgZone, private data: DataService) {
    console.info(`Explore Service Created...`);
    // Camera Stuff
    this.camera.position.set(0, 0, 10);
    this.camera.fov = 75;
    this.camera.near = 1;
    this.camera.far = 50;
    this.camera.updateProjectionMatrix();
    this.scene.add(this.camera);

    // Light Stuff
    // this.light.lookAt(0,0,0);
    this.camera.add(this.light);

    let sub = this.canvas$.subscribe((canvas) => this.init(canvas));
    this.subs.push(sub);
  }

  private init(canvas: HTMLCanvasElement): void {
    // Creater Renderer From The Changed Canvas
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    // Renderer Settings
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Created Control From Changed Canvas
    // Controller Settings
    this.control = new OrbitControls(this.camera, canvas);
    this.control.minDistance = 6;
    this.control.maxDistance = 10;
    // this.control.autoRotate = true;
    // this.control.autoRotateSpeed = 1;
    this.control.enableKeys = false; // Use keys to move
    // this.control.enableZoom = false; // Zoom
    this.control.enablePan = false; // Move the camera
    this.control.enableDamping = true; // Weight to controls
    this.control.zoomSpeed = 0.4;
  }

  private render(): void {
    this.ngZone.runOutsideAngular(() => {
      this.control.update();
      this.renderer.render(this.scene, this.camera);
    });
  }

  public ngOnDestroy(): void {
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public set setCanvas(canvas: HTMLCanvasElement) {
    this.canvas$.next(canvas);
  }

  public resize(width: number, height: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  public start(): void {
    console.info("Rendering Started...");
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  public stop(): void {
    this.renderer.setAnimationLoop(null);
    console.info("Rendering Stopped...");
  }

  public removeObject(thing: any, target?: any): void {}

  public addObject(obj: Object3D, target?: string): void {
    if (!target || target === "scene") this.scene.add(obj);
    else this.scene.getObjectByName(target).add(obj);
  }

  public hasObject(obj: string, target?: string): boolean {
    if (!target || target === "scene") {
      return !!this.scene.getObjectByName(obj);
    }
  }
}
