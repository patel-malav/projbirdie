import { Material, Geometry, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';

export default class Bird {
    
    geometry: Geometry;
    material: Material;
    mesh: Mesh

    constructor({material = null, texture = null, name=null}) {
        this.geometry = new BoxGeometry(150, 150, 150);
        this.material = new MeshBasicMaterial();
        this.mesh = new Mesh(this.geometry, this.material);
    }
}