import { Material, Geometry, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { getVector3 } from '../lib';

export default class Bird {
    
    private geometry: Geometry;
    private material: Material;
    mesh: Mesh

    constructor(opts?: {[key:string]: any}) {
        // Temp.
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = opts?.material ? opts.material : new MeshBasicMaterial({color: 0x00ff00});
        this.mesh = new Mesh(this.geometry, this.material);
    }

    location(lat: number, long: number) {
        this.mesh.position.copy(getVector3(lat, long, 1));
    }
}