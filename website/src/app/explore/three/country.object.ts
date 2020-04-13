import { Object3D, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { level } from "src/environments/environment";

export class Country extends Object3D {
  constructor(cid: string, public level?: number) {
    super();
    this.name = cid;
  }
  public addMesh(obj: Object3D): Country {
    let body = obj.children[0] as Mesh;
    body.scale.set(6, 6, 6);
    body.material = new MeshStandardMaterial({ color: level[this.level] });
    this.add(body);
    return this;
  }
  public changeColor(color: number): void {
    let material = (this.children[0] as Mesh).material as MeshStandardMaterial;
    material.color.setHex(color);
    material.needsUpdate = true;
  }
  public lift(value: number): void {
    this.scale.addScalar(value * 0.01);
  }
}
