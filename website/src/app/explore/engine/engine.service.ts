import * as THREE from "three";
import { Injectable, OnDestroy, NgZone, ElementRef } from "@angular/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";
import Earth from "../obj/earth";
import { BehaviorSubject, from } from "rxjs";
import Bird from "../obj/bird";
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  Sphere,
  SphereBufferGeometry,
  Object3D
} from "three";

@Injectable({
  providedIn: "root"
})
export class EngineService implements OnDestroy {
  /**
   * Canvas HTML Element.
   */
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private control: OrbitControls;
 
  private frameId: number = null;

  constructor(private ngZone: NgZone) {}

  /**
   * When Canavs taken out of context destroy the canvas.
   */
  ngOnDestroy(): void {
    // Change of code if possible
    // this.renderer.setAnimationLoop(null);
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public stop(): void{
    console.log(`removing the canvas`);
    if (this.frameId !== null) {
      console.log(`nulll`);
      cancelAnimationFrame(this.frameId);
    }
  }

  /**
   * Kickstart's threejs engine with this method.
   * @param canvas <- Canvas Element of DOM.
   */
  public init(canvas: ElementRef<HTMLCanvasElement>): void {
    // Assign Canvas element to actual dom element.
    this.canvas = canvas.nativeElement;

    // renderer to use for rendering the canvas.
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas, // Canvas to render Content
      alpha: true, // Transparent Background
      antialias: true // Smooth Edges
    });
    this.renderer.setClearColor(0x000000, 0); // Sets the clearing color to use ie paint the frame with this color.
    this.renderer.setPixelRatio(window.devicePixelRatio); // sets sharpness for HiDPi device's like mobile and tablets
    this.renderer.setSize(
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      false
    ); // Initial Size

    // Scene where will show the stuff.
    this.scene = new THREE.Scene();

    // Creating Camera
    {
      let fov = 75, // field of view angle
        aspect = this.canvas.clientWidth / this.canvas.clientHeight, // Width / Height
        near = 1, // nearest distance to render from origin
        far = 25; // farthest distance to render from origin
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

      // Cartesian coordinates.
      let x = 0,
        y = 0,
        z = 20;
      this.camera.position.set(x, y, z);
      this.scene.add(this.camera);
    }

    // Ambient Light
    {
      let color = 0xffffff; // light color
      this.light = new THREE.AmbientLight(color);
      // Cartesian coordinates.
      let x = 0,
        y = 0,
        z = 20;
      this.light.position.set(x, y, z);
      this.scene.add(this.light);
    }

    // Creating Orbit Control
    {
      let camera = this.camera, // Camera
        domEle = this.canvas; // Movement Control Element
      this.control = new OrbitControls(camera, domEle);
      this.control.maxDistance = 25;
      this.control.minDistance = 15;
      // this.control.autoRotate = true;
      // this.control.autoRotateSpeed = 1;
      this.control.enableKeys = false;
      // this.control.enableZoom = false;
      this.control.enablePan = false;
      this.control.enableDamping = true;
      this.control.zoomSpeed = 0.4;
    }
  }

  /**
   * Start the freking animation Loop
   */
  public animate(): void {
    // The Code execute's outside of angular enviorment scope to make it faster.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== "loading") {
        
        this.render();
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          this.render();
        });
      }

      window.addEventListener("resize", () => {
        this.resize();
      });
    });
  }

  /**
   * Thing to render
   */
  private render(): void {
    // Change to use
    // this.renderer.setAnimationLoop(() => {});
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    // this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Handler for window resize event and update the canvas to look beautiful.
   */
  private resize(): void {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  /**
   * Create Earth and add to canvas.
   */
  public showEarth(): void {
    new Earth(10, 32);
    // new Earth(10, 32,{wireframe: true});
    this.scene.add(Earth.object);
  }

  /**
   * Show The bird based on data.
   * @param data id: number, geo: {lat, long}
   */
  public showBird(data: any):void {
    Bird.model.then(obj => {
      new Bird(data, {model: obj, color: 0x00ff00});
      Earth.object.add(...Bird.objects);
    });
  }

  public add(obj: Object3D):void {
    this.scene.add(obj);
  }
}
