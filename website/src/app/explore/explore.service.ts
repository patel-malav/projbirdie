import { Injectable, NgZone, OnDestroy } from "@angular/core";
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Light,
  DirectionalLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Subject, Subscription } from "rxjs";
import { Apollo } from "apollo-angular";

@Injectable({
  providedIn: "root",
})
export class ExploreService implements OnDestroy {
  // Rxjs Subs
  private subs: Subscription[] = [];
  // Canvas
  private canvas$ = new Subject<HTMLCanvasElement>();
  public set setCanvas(canvas: HTMLCanvasElement) {
    this.canvas$.next(canvas);
  }
  // Three Globals
  private scene: Scene = new Scene();
  private camera: PerspectiveCamera = new PerspectiveCamera();
  private light: Light = new DirectionalLight();
  private renderer: WebGLRenderer;
  private control: OrbitControls;

  constructor(private ngZone: NgZone, private apollo: Apollo) {
    console.log(`Explore Service Created...`);
    // Camera Stuff
    this.camera.position.set(0, 0, 100);
    this.camera.fov = 75;
    this.camera.near = 1;
    this.camera.far = 500;
    this.camera.updateProjectionMatrix();
    this.scene.add(this.camera);

    // Light Stuff
    // this.light.lookAt(0,0,0);
    this.camera.add(this.light);

    this.canvas$.subscribe((canvas) => this.init(canvas));
  }

  public ngOnDestroy(): void {
    console.log("Destroying Explore Service... ");
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private init(canvas: HTMLCanvasElement): void {
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.control = new OrbitControls(this.camera, canvas);
    this.control.minDistance = 6;
    this.control.maxDistance = 10;
    this.control.autoRotate = true;
    this.control.autoRotateSpeed = 1;
    this.control.enableKeys = false;
    this.control.enableZoom = false;
    this.control.enablePan = false;
    this.control.enableDamping = true;
    this.control.zoomSpeed = 0.4;
  }

  private render() {
    this.ngZone.runOutsideAngular(() => {
      this.control.update();
      this.renderer.render(this.scene, this.camera);
    });
  }

  public resize(width: number, height: number): void {
    this.ngZone.runOutsideAngular(() => {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  public start(): void {
    console.log("Rendering Started...");
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  public stop(): void {
    this.renderer.setAnimationLoop(null);
    console.log("Rendering Stopped...");
  }
}