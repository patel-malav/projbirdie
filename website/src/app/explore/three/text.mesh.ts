import { Mesh, TextBufferGeometry, Font, MeshBasicMaterial, Vector3 } from "three";

export class Text extends Mesh {
  static material = new MeshBasicMaterial();
  constructor(
    text: string,
    font: Font,
    pos: Vector3,
    displaySize: number,
    zoomLevel = 0
  ) {
    super();
    this.geometry = new TextBufferGeometry(text, {
      font,
      size: displaySize * 0.015,
      height: 0.01,
    });
    this.lookAt(pos.multiplyScalar(6 + zoomLevel * 0.1));
    this.position.copy(pos);
    this.geometry.center();
  }
}
