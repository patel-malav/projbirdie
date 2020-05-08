import { Object3D, Mesh, MeshStandardMaterial, Vector3 } from "three";

export class Country extends Object3D {
  center: Promise<Vector3>;
  constructor(cid: string, public level?: number) {
    super();
    this.name = cid;
  }
  public set addSurfaceBody(obj: Object3D) {
    let body = obj.children[0] as Mesh;
    body.scale.set(6, 6, 6);
    body.material = new MeshStandardMaterial();
    this.add(body);
    this.center = new Promise((res) => {
      body.geometry.computeBoundingSphere();
      res(body.geometry.boundingSphere.center);
    });
  }
  public set changeColor(color: number) {
    let material = (this.children[0] as Mesh).material as MeshStandardMaterial;
    material.color.setHex(color);
    material.needsUpdate = true;
  }
  public set lift(value: number) {
    this.scale.addScalar(value * 0.01);
  }
}
