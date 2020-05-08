import {
  Mesh,
  TextBufferGeometry,
  Font,
  MeshBasicMaterial,
  Vector3,
} from "three";

interface Config {
  pos: Vector3;
  display_size: number;
  zoom_level: number;
}

export class Text extends Mesh {
  static material = new MeshBasicMaterial({ color: 0x000000 });
  constructor(text: string, font: Font, config: Config) {
    super();
    this.geometry = new TextBufferGeometry(text, {
      font,
      size: config.display_size * 0.015,
      height: 0.01,
    });
    this.lookAt(config.pos.multiplyScalar(6 + config.zoom_level * 0.1));
    this.position.copy(config.pos);
    this.geometry.center();
  }
}
