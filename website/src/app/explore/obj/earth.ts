import {
  Object3D,
  SphereBufferGeometry,
  Mesh,
  Texture,
  MeshStandardMaterial,
  TextureLoader,
  Vector3,
  LineCurve3,
  CurvePath,
  BufferGeometry,
  LineBasicMaterial,
  Line,
  Color,
  Material,
  Geometry
} from "three";
import { lonLatToVector3 } from "../lib";

interface opts {
  name?: string;
  url?: string;
  texture?: Texture;
  color?: number;
  wireframe?: boolean;
}

export default class Earth {
  static object: Object3D = new Object3D();
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

    this.do();

    object.add(mesh);
    Earth.object.add(object);
  }

  // Covert points to Vector.
  private _convCoords(coordinates: number[][]): Vector3[] {
    let vectors: Vector3[] = [];
    for (let cord of coordinates) {
      let [long, lat] = cord;
      let vec3 = lonLatToVector3(long, lat);
      vectors.push(vec3.multiplyScalar(10));
    }
    return vectors;
  }

  private _convVec3(vectors: Vector3[]): LineCurve3[] {
    let segments: LineCurve3[] = [];
    for (let i = 0; i < vectors.length; i++) {
      if (i === vectors.length) {
        segments.push(new LineCurve3(vectors[i], vectors[0]));
      } else {
        segments.push(new LineCurve3(vectors[i], vectors[i + 1]));
      }
    }
    return segments;
  }

  private _makeShape(
    segments: LineCurve3[],
    material: LineBasicMaterial
  ): Object3D {
    let curve = new CurvePath<Vector3>();
    curve.curves = segments;
    let geometry = new BufferGeometry().setFromPoints(curve.getPoints(1));
    // if (!material){
    //   let color = new Color(Math.random() * 255, Math.random()*255, Math.random()*255);
    //   material = new LineBasicMaterial({color});
    // }
    return new Line(geometry, material);
  }

  private do() {
    let material = new LineBasicMaterial({color: '#f44336'});
    fetch("assets/countires.json")
      .then(resp => resp.json())
      .then(resp => {
        for(let feature of resp.features)
        // for (let i = 0; i < 1; i++) 
        {
          let geoData = feature.geometry;
          // let geoData = resp.features[i].geometry;
          // let id = resp.features[i].id;
          // let name = resp.features[i].properties.name;
          // let r = Math.random() * 255, g = Math.random() * 255, b = Math.random() * 255;
          // let color = new Color(r,g,b);
          // let color = new Color(255, 0, 0);
          // let material = new LineBasicMaterial({color});
          let obj = new Object3D();

          if (geoData.type === "MultiPolygon") {
            for (let polygon of geoData.coordinates) {
              for (let subgon of polygon) {
                let vectors = this._convCoords(subgon);
                let segments = this._convVec3(vectors);
                let shape = this._makeShape(segments, material);
                obj.add(shape);
              }
            }
          } else {
            for (let polygon of geoData.coordinates) {
              let vectors = this._convCoords(polygon);
              let segments = this._convVec3(vectors);
              let shape = this._makeShape(segments, material);
              obj.add(shape);

            }
          }
          Earth.object.add(obj);
        }
      });
  }
}
