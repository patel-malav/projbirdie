import { Pbobj } from '../pbobj';
import { SphereBufferGeometry, MeshBasicMaterial, TextureLoader, Mesh, Clock, BoxGeometry } from 'three';
import { getVector3 } from '../geolocation';

export class Earth implements Pbobj {

    private radius = 100;

    loader = new TextureLoader();
    geometry = new SphereBufferGeometry(this.radius, 32, 32);
    // Texture Loader ?? Improve this system
    material = new MeshBasicMaterial({map: this.loader.load(`https://i.imgur.com/45naBE9.jpg`)});
    mesh = new Mesh(this.geometry, this.material);
    animate = true;
    completed = false;

    constructor(private data: any) {
        this.draw();
    }

    draw() {
        let geometry = new BoxGeometry(1, 1, 1);
        let material = new MeshBasicMaterial({color: 0xfff000});

        let cube = new Mesh(geometry, material);
        cube.position.copy(getVector3(this.data.geo.lat, this.data.geo.long));
        this.mesh.add(cube);
    }

    update() {       
        this.mesh.rotateY(0.001);
    }
}
