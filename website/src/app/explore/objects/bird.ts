import { Material, Geometry, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

export default class Bird {
    
    geometry: Geometry;
    material: Material;
    mesh: Mesh

    constructor() {
        this.geometry = new BoxGeometry(202, 200, 200);
        this.material = new MeshBasicMaterial();
        this.mesh = new Mesh(this.geometry, this.material);
    }
}