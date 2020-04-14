import { Mesh, TextBufferGeometry, Font, MeshBasicMaterial, Vector3 } from "three";

export class Text extends Mesh {
  static material = new MeshBasicMaterial();
  constructor(
    text: string,
    font: Font,
    pos: Vector3,
    displaySize: number,
    zoomLevel?: number
  ) {
    super();
    this.geometry = new TextBufferGeometry(text, {
      font,
      size: displaySize * 0.1,
      height: 0.05,
    });
    console.log(this.geometry);
    this.lookAt(pos.multiplyScalar(6.3));
    this.position.copy(pos);
    this.geometry.center();
  }
}
