import {
  Object3D,
  Mesh,
  MeshToonMaterial,
  SphereBufferGeometry,
  AxesHelper,
} from "three";
import { colors } from "src/environments/environment";

let radius = 4;
let segments = 32;

export class Earth extends Object3D {
  private surface: Mesh;
  constructor() {
    super();
    this.name = "Earth";
    let geometry = new SphereBufferGeometry(radius, segments, segments);
    let material = new MeshToonMaterial({ color: colors.surface });
    let surface = new Mesh(geometry, material);
    surface.name = "surface";
    this.add(surface);
    this.add(new AxesHelper(5));
  }
  public set surfaceColor(v: number) {
    let material = this.surface.material as MeshToonMaterial;
    material.color.setHex(v);
    material.needsUpdate = true;
  }
}
