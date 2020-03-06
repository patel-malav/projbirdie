import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Pbobj } from '../pbobj';
import { SphereBufferGeometry, MeshBasicMaterial, TextureLoader, Mesh, Clock, BoxGeometry } from 'three';
import { getVector3 } from '../geolocation';

@Injectable()
export class Earth implements Pbobj {

    private radius = 100;

    texture = new TextureLoader().load(`https://i.imgur.com/45naBE9.jpg`);
    geometry = new SphereBufferGeometry(this.radius, 32, 32);
    // Texture Loader ?? Improve this system
    material = new MeshBasicMaterial({map: this.texture});
    mesh = new Mesh(this.geometry, this.material);
    animate = true;
    completed = false;

    constructor(private apollo: Apollo) {
        this.draw();
    }

    async draw() {
        this.apollo.query({ query: gql`{hello}`}).subscribe((data) => {
            console.log(data);
        });
    //     let geometry = new BoxGeometry(1, 1, 1);
    //     let material = new MeshBasicMaterial({color: 0xfff000});
    //     let cube = new Mesh(geometry, material);
    //     this.mesh.add(cube);        
    //     let {data:{getBird:{location:{lat,long},name}}} = await this.data;

    //     console.log(name);

    //     cube.position.copy(getVector3(lat, long));
    }

    update() {
        this.mesh.rotateY(0.001);
    }
}
