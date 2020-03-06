import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Light, Color, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Earth from '../objects/earth';

@Component({
  selector: 'pb-globe',
  template: `
      <canvas #canvas></canvas>
      <div #interface></div>
  `,
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('canvas') private canvasRef: ElementRef;


  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  // Declaration
  private rootScene: Scene;
  private camera: PerspectiveCamera;
  private control: OrbitControls;
  private lights: Light[] = [];
  private objects = [];
  private renderer: WebGLRenderer;
  private earth: Earth;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if(this.canvas) {
      // Creating root Scene
      this.rootScene = new Scene();
      // Creating Camera
      {
        let fov = 45;
        let aspect = 2;
        let near = 0.1;
        let far = 600;
        this.camera = new PerspectiveCamera(fov, aspect, near, far);
        let x = 0, y = 0, z = 250;
        this.camera.position.set(x, y, z);
      }
      // Creating Orbit Control
      {
        this.control = new OrbitControls(this.camera, this.canvas);
        this.control.enableKeys = false;
        this.control.enablePan = false;
      }
      // Creating Render
      {
        // let width = 600;
        // let height = 600;
        this.renderer = new WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true
        });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.setSize(width, height);
        // this.renderer.gammaFactor = 2.2;
        // this.renderer.gammaOutput = true;
  
        // this.renderer.physicallyCorrectLights = true;
      }
      // Animation Loop
      this.renderer.setAnimationLoop(() => this.animate());

      // Adding Lights
      {
        let color = new Color('#ffffff');
        let intensity = 1;
        // let light = new PointLight(color, intensity, distance);
        let light = new DirectionalLight(color, intensity);
        let x = -2, y = 5, z = 5;
        light.position.set(x, y, z);
        this.lights.push(light);
        this.rootScene.add(light);
      }

      this.setup();
    }
  }

  ngAfterViewChecked(): void { }

  /**
   * This method will run once after three js resources created
   */
  
  setup() {
    // Earth Object
    this.earth = new Earth();
    this.rootScene.add(this.earth.mesh);
  }
  
  /**
   * This method will run every frame
   */

  animate() {

    this.earth.animate();

    this.updateAspect();

    // Render the scene
    this.renderer.render(this.rootScene, this.camera);
  }

  /**
   *  Update's the Aspect Ratio of the canvas.
   */

  private updateAspect() {
    // Adjustment to canvas resizes
    if(this.canvas.width !== this.canvas.clientWidth || this.canvas.height !== this.canvas.clientHeight) {
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  }
}
