import { Scene, PerspectiveCamera, WebGLRenderer, Light, Color, DirectionalLight} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Earth from './objects/earth';

export default class Explorer {
    rootScene: Scene;
    camera: PerspectiveCamera;
    control: OrbitControls;
    renderer: WebGLRenderer;
    earth: Earth;
    lights: Light[] = [];
    constructor(public canvas: HTMLCanvasElement) {
        // Creating root scene
        this.rootScene = new Scene();

        // Creating Camera
        {
            let fov = 45, aspect = 2, near = 0.1, far = 600;
            this.camera = new PerspectiveCamera(fov, aspect, near, far);
            let x = 0, y = 0, z = 250;
            this.camera.position.set(x,y,z);
        }

        // Creating Orbit Control
        {
            let camera = this.camera, domEle = canvas;
            this.control = new OrbitControls(camera, domEle);
            this.control.enableKeys = false;
            this.control.enablePan = false;
        }

        // Creating Renderer
        {
            // let width = 600, height = 600;
            this.renderer = new WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true
            });
            this.renderer.setClearColor(0x000000, 0);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            // this.renderer.setSize(width, height);
            // this.renderer.gammaFactor = 2.2;
            // this.renderer.gammaOutput = true;
        }

        // Animation Loop
        this.renderer.setAnimationLoop(() => {
            this.animate();
        });
    }

    /**
     * Method To Custom Stuff
     */
    setup() {
        // Adding Light
        {
            let color = new Color('#ffffff'), intensity = 1;
            // let light = new PointLight(color, intensity, distance);
            let light = new DirectionalLight(color, intensity);
            let x = -2, y = 5, z = 5;
            light.position.set(x, y, z);
            this.lights.push(light);
            this.rootScene.add(light);
        }
        // Earth
        {
            this.earth = new Earth();
            this.rootScene.add(this.earth.mesh);
            this.earth.setup();
        }
    }

    /**
     * Method Run's Every Frame
     */
    animate() {
        this.earth.animate();
        this.updateAspect();
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