import { Scene, PerspectiveCamera, WebGLRenderer, Light, Color, DirectionalLight, Object3D} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Explorer {
    scene: Scene;
    camera: PerspectiveCamera;
    control: OrbitControls;
    renderer: WebGLRenderer;
    updates: {(): void} [] = [];
    constructor(public canvas: HTMLCanvasElement) {
        // Creating root scene
        this.scene = new Scene();

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
            this.control.enableZoom = false;
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
            this.updateAspect();
            this.renderer.render(this.scene, this.camera);
        });
    }

    /**
     * Method Run's Every Frame
     */
    // public animate(obj: PbObj) {
    //     obj.animate();
    // }

    /**
     * Add object to scene
     * @param obj Any Object3D
     */
    public add(obj: Object3D) {
        this.scene.add(obj);
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