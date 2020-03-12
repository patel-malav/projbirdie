import {
  Object3D,
  SphereBufferGeometry,
  Mesh,
  Texture,
  MeshStandardMaterial,
  TextureLoader
} from "three";

interface opts {
  name?: string;
  url?: string;
  texture?: Texture;
  color?: number;
  wireframe?: boolean;
}

export default class Earth {
  static object: Object3D;
  static texture: Texture = new TextureLoader().load(
    `https://i.imgur.com/45naBE9.jpg`
  );

  constructor(radius: number = 10, segment: number = 32, opts?: opts) {
    let object = new Object3D();
    let geometry = new SphereBufferGeometry(radius, segment, segment);
    let material = new MeshStandardMaterial({ map: Earth.texture });
    let mesh = new Mesh(geometry, material);
    if (opts?.wireframe) material.wireframe = opts.wireframe;
    if (opts?.name) object.name = name;
    if (opts?.color) material.color.setHex(opts.color);
    if (opts?.texture) {
      Earth.texture = opts.texture;
      material.map = opts.texture;
      material.needsUpdate = true;
    }

    if (opts?.url) {
      let texture = new TextureLoader().load(opts.url, () => {
        material.map = texture;
        material.needsUpdate = true;
      });
    }

    object.add(mesh);
    Earth.object = object;
  }
}
