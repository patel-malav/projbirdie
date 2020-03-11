import {
  SphereBufferGeometry,
  Material,
  Geometry,
  BufferGeometry,
  Texture,
  MeshBasicMaterial,
  Mesh,
  TextureLoader
} from "three";
import Bird from "./bird";

export default class Earth {
  private geometry: BufferGeometry;
  private material: Material | MeshBasicMaterial;
  private texture: Texture;
  mesh: Mesh;

  constructor(
    radius: number = 100,
    segments: number = 32,
    { material = null, texture = null, name = null } = {}
  ) {
    this.geometry = new SphereBufferGeometry(radius, segments, segments);
    this.material = !!material ? material : new MeshBasicMaterial();
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.name = name;
    if (!!texture) this.texture = texture;
    else {
      this.texture = new TextureLoader().load(
        `https://i.imgur.com/45naBE9.jpg`,
        () => {
          Object.assign(this.material, { map: this.texture });
          this.material.needsUpdate = true;
        }
      );
    }
  }

  showObservation(id: string) {
    console.log(id);
  }

  // animate() { }
}
