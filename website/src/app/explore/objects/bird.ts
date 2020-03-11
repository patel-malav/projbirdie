import { Material, Geometry, Mesh, BoxGeometry, MeshBasicMaterial, MeshStandardMaterial, Object3D } from 'three';
import { getVector3 } from '../lib';

export default class Bird {
    
    private geometry: Geometry;
    private material: Material;
    mesh: Object3D;

    constructor(opts?: {[key:string]: any}) {
        console.log(`hello`);
        if(!!opts.model) {
            console.log(opts.model);
            let model = opts.model.clone(true);
            console.log(model);
            model.scale.set(100,100,100);
            // @ts-ignore
            model.getObjectByName('hum_body').material = new MeshStandardMaterial({color: 0x00ff00});
            this.mesh = model;
        } else {
            // Temp.
            this.geometry = new BoxGeometry(1, 1, 1);
            this.material = opts?.material ? opts.material : new MeshBasicMaterial({color: 0x00ff00});
            this.mesh = new Mesh(this.geometry, this.material);
        }
    }

    location(lat: number, long: number) {
        this.mesh.position.copy(getVector3(lat, long, 2));
    }
}