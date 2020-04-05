import { Injectable, OnDestroy, NgZone, OnChanges } from "@angular/core";
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Color,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Subject, Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExploreService implements OnChanges {
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
  private light: AmbientLight = new AmbientLight(new Color(0xffffff), 1);
  private renderer: WebGLRenderer;
  private control: OrbitControls;

  constructor(private ngZone: NgZone) {
    console.log(`Explore Service Created...`);
    // Camera Stuff
    this.camera.position.set(0, 0, 8);
    this.camera.fov = 75;
    this.camera.near = 1;
    this.camera.far = 10;
    this.camera.updateProjectionMatrix();

    // Light Stuff
    this.light.position.set(0, 0, 15);

    this.canvas$.pipe(take(1)).subscribe((canvas) => this.init(canvas));
  }

  ngOnChanges(): void {
    console.log(`Changes`);
  }

  private init(canvas: HTMLCanvasElement): void {
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.control = new OrbitControls(this.camera, canvas);
    this.control.minDistance = 4;
    this.control.maxDistance = 10;
    this.control.autoRotate = true;
    this.control.autoRotateSpeed = 1;
    this.control.enableKeys = false;
    // this.control.enableZoom = false;
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
    // console.log(canvas, canvas.clientWidth, canvas.clientHeight);
    // console.log(canvas, canvas.width, canvas.height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    // console.log(canvas.clientWidth / canvas.clientHeight);
  }

  public start(): void {
    console.log(`Canvas Rendering Started...`);
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  public stop(): void {
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public testCube(): void {
    let geometry = new BoxGeometry(4,4,4);
    let material = new MeshBasicMaterial({ color: 0xffffff });
    let cube = new Mesh(geometry, material);
    this.scene.add(cube);
  }
}
