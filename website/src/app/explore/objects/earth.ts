import {
  Object3D,
  MeshBasicMaterial,
  Mesh,
  SphereBufferGeometry,
  TextureLoader,
  Texture,
} from "three";

export class Earth extends Object3D {
  public radius = 4;
  private segemets = 32;
  private surface: Mesh;
  public get color(): number {
    let material = this.surface.material as MeshBasicMaterial;
    return material.color.getHex();
  }
  public set color(v: number) {
    let material = this.surface.material as MeshBasicMaterial;
    material.color.setHex(v);
  }
  public set wireframe(v: boolean) {
    let material = this.surface.material as MeshBasicMaterial;
    material.wireframe = v;
  }

  public set setTexture(v: string) {
    let material = this.surface.material as MeshBasicMaterial;
    let loader = new TextureLoader();
    loader.load(v, (texture: Texture) => {
      material.map = texture;
      material.needsUpdate = true;
    },
    null,
    (err) => console.log(err));
  }

  constructor() {
    super();
    this.name = "earth"
    let geometry = new SphereBufferGeometry(
      this.radius,
      this.segemets,
      this.segemets
    );
    let material = new MeshBasicMaterial();
    this.surface = new Mesh(geometry, material);
    this.surface.name = "surface";
    this.color = 0x26f7fd;
    // this.setTexture = "https://i.imgur.com/45naBE9.jpg";
    this.add(this.surface);
  }
}
