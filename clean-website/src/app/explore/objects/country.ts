import {
  Object3D,
  MeshBasicMaterial,
  Mesh,
  ExtrudeGeometry,
  Shape,
  Geometry,
  Vector3,
  Face3,
  AxesHelper
} from "three";

export class Country extends Object3D {
  constructor() {
    super();
    // this.name = "country";
    // let geometry = new Geometry();
    // let points: Vector3[] = [
    //     new Vector3(0,0,0),
    //     new Vector3(1,0,0),
    //     new Vector3(1,1,0),
    //     new Vector3(0,1,0),
    //     new Vector3(-1,1,0),
    //     new Vector3(-1,0,0),
    //     new Vector3(0,0,0)
    // ];
    
    // geometry.setFromPoints(points);
    // let faces: Face3[] = [
    //     new Face3(0,1,2),
    //     new Face3(0, 2, 3)
    // ]
    // geometry.faces = faces;
    // geometry.verticesNeedUpdate = true;
    // geometry.elementsNeedUpdate = true;
    // let material = new MeshBasicMaterial({ color: 0x0000ff });
    // // material.wireframe = true;
    // let mesh = new Mesh(geometry, material);
    // mesh.add(new AxesHelper(5));
    // console.log(mesh);
    // this.add(mesh);
  }
}
