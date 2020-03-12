import {
  Object3D,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  MeshStandardMaterial
} from "three";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";

interface data {
  id: string;
  geo: {
    lat: number;
    long: number;
  };
}
interface opts {
  model?: Object3D;
  color?: number;
}

function getVector3(lat: number, long: number, alti = 0, radius = 10) {
  radius += alti;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default class Bird {
  static objects: Object3D[] = [];
  static model = new Promise<Object3D>((resolve, reject) => {
    new OBJLoader2().load(
      `assets/HUMBIRD.OBJ`,
      obj => resolve(obj),
      null,
      err => reject(err)
    );
  });

  constructor(data: data, opts?: opts) {
    let object: Object3D;

    if (opts?.model) {
      object = opts.model.clone();
      if(opts?.color) {         
          let hum_body = object.getObjectByName('hum_body') as Mesh;
          hum_body.material = new MeshStandardMaterial({color: opts.color});
      }
    } else {
      object = new Object3D();
      let geometry = new BoxGeometry(1, 1, 1);
      let material = new MeshStandardMaterial({ color: 0x00ff00 });
      object.add(new Mesh(geometry, material));
    }
    object.userData = data;
    object.position.copy(getVector3(data.geo.lat, data.geo.long));
    object.scale.set(10, 10, 10);
    Bird.objects.push(object);
  }
}
