import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Light, Color, DirectionalLight, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pbobj } from '../pbobj';
import { Earth } from '../objects/earth';

@Component({
  selector: 'pb-globe',
  template: `
      <canvas #canvas></canvas>
      <div #interface></div>
  `,
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  // @ViewChild('canvas')
  // private canvasRef: ElementRef;

  // @ViewChild('interface')
  // private interfaceRef: ElementRef;

  // private get canvas(): HTMLCanvasElement {
  //   return this.canvasRef.nativeElement;
  // }

  // // Declaration
  // private rootScene: Scene;
  // private camera: PerspectiveCamera;
  // private control: OrbitControls;
  // private lights: Light[] = [];
  // private objects: Pbobj[] = [];
  // private renderer: WebGLRenderer;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // if(this.canvas) {
    //   // Creating root Scene
    //   this.rootScene = new Scene();
    //   // Creating Camera
    //   {
    //     let fov = 45;
    //     let aspect = 2;
    //     let near = 0.1;
    //     let far = 600;
    //     this.camera = new PerspectiveCamera(fov, aspect, near, far);
    //     let x = 0, y = 0, z = 250;
    //     this.camera.position.set(x, y, z);
    //   }
    //   // Creating Orbit Control
    //   {
    //     this.control = new OrbitControls(this.camera, this.canvas);
    //     this.control.enableKeys = false;
    //     this.control.enablePan = false;
    //   }
    //   // Creating Lights
    //   {
    //     let color = new Color('#ffffff');
    //     let intensity = 1;
    //     let distance = 100;
    //     // let light = new PointLight(color, intensity, distance);
    //     let light = new DirectionalLight(color, intensity);
    //     let x = -2, y = 5, z = 5;
    //     light.position.set(x, y, z);
    //     this.lights.push(light);

    //     this.rootScene.add(light);
    //   }
    //   // Creating Render
    //   {
    //     this.renderer = new WebGLRenderer({
    //       canvas: this.canvas,
    //       antialias: true,
    //       alpha: true
    //     });
    //     // let width = 600;
    //     // let height = 600;
    //     // this.renderer.setSize(width, height);
    //     this.renderer.setClearColor(0x000000, 0);
    //     this.renderer.setPixelRatio(window.devicePixelRatio);
    //     // this.renderer.gammaFactor = 2.2;
    //     // this.renderer.gammaOutput = true;

    //     // this.renderer.physicallyCorrectLights = true;
    //   }
    //   // Earth Object added
    //   {
    //     let earth = new Earth();
    //     this.objects.push(earth);
    //     this.rootScene.add(earth.mesh);
    //   }
    //   // Animation Loop
    //   this.renderer.setAnimationLoop( () => this.animate());
    // }
  }

  ngAfterViewChecked(): void { }

  animate() {
    // // call update method for each object
    // this.objects.forEach(obj => {
    //   if(obj.animate) {
    //     obj.update();
    //   }
    //   // console.log(`helo`);
    // });

    // // Adjustment to canvas resizes
    // if(this.canvas.width !== this.canvas.clientWidth || this.canvas.height !== this.canvas.clientHeight) {
    //   this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
    //   this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    //   this.camera.updateProjectionMatrix();
    // }

    // // Render the scene
    // this.renderer.render(this.rootScene, this.camera);
  }
}
