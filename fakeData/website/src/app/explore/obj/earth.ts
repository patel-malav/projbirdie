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
  Color,
  Material,
  Geometry,
  LineLoop,
  BoxGeometry,
  Line,
  FontLoader,
  TextGeometry,
  MeshBasicMaterial,
  Font,
  TextBufferGeometry
} from "three";
import { from, of, timer, asyncScheduler } from "rxjs";
import { lonLatToVector3 } from "../lib";
import { delay, take } from "rxjs/operators";

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
    // `assets/earth_0`
  );

  constructor(radius: number = 10, segment: number = 32, opts?: opts) {
    let object = new Object3D();
    let geometry = new SphereBufferGeometry(radius, segment, segment);
    let material = new MeshStandardMaterial({ map: Earth.texture, color: 0xffffff});
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

    Earth.showBorders();
    Earth.showCountries();

    object.add(mesh);
    Earth.object.add(object);
  }

  /**
   * Method to show border of countries...
   */
  static async showBorders() {
    // console.log(`Starting Creation of Border and Capitals....`);
    /**
     * Draw Border's...
     */
    let borders = new Object3D();
    // Get Data from the server..
    let data: { type: string; features: any[] } = await fetch(
      "assets/countires.json"
    ).then(resp => resp.json());
    // console.log(`Showing - ${data.type}... Countries`);

    // Observable to as addon to manipulate data if needed future proofing...
    let countires = from(data.features, asyncScheduler); //.pipe(take(1));

    // Subscribe to data from json...
    countires.subscribe(data => {
      // console.log(data.properties.name ,data.geometry);
      // Material for a country border...
      let rand = Math.floor(Math.random() * 360);
      let material = new LineBasicMaterial({
        color: new Color(`hsl(${rand}, 80%, 30%)`)
      });

      // Loop through all polygons...
      for (let polygon of data.geometry.coordinates) {
        // GeoJson has Coordinate Array if MultiPolygon then there is one more Nested Array
        if (data.geometry.type === "MultiPolygon") {
          polygon = polygon[0];
        }
        let obj = new Object3D();
        let vectors: Vector3[] = []; // Array to store calculated vectors..
        let segments: LineCurve3[] = []; //  Array to store all LineCurves..
        let curve = new CurvePath<Vector3>(); // Curve represinting all vectors..
        let geometry = new BufferGeometry(); // Geometry calcutated from curve

        // Loop through each coordinate in polygon data..
        for (let coord of polygon) {
          let vec3 = lonLatToVector3(coord[0], coord[1]);
          vectors.push(vec3.multiplyScalar(10));
        }
        // Make LineCurve's from Vectors..
        for (let i = 0; i < vectors.length - 1; i++) {
          let segment = new LineCurve3(vectors[i], vectors[i + 1]);
          segments.push(segment);
        }

        // Assigning the curves to segment to make a Conneted figure...
        curve.curves = segments;
        // Make geometry from curve..
        geometry.setFromPoints(curve.getPoints(1));
        // Line Respresing the a border for a polygon..
        let border = new LineLoop(geometry, material);
        // border.position.set(rand,rand,rand);

        // adding to a object represting collection of border's

        borders.add(obj.add(border));
      }
    });
    // Add the borders Object to Earth...
    Earth.object.add(borders);
  }

  static async showCountries() {
    let font = await new Promise((res, rej) => {
      let loader = new FontLoader();
      loader.load(`assets/gentilis_regular.typeface.json`, (font: Font) => {res(font)}, null, err => {rej(err)});
    });
    let data = await fetch(`assets/capitals.json`).then(resp => resp.json());
    let capitals: any = from(data.features, asyncScheduler); //.pipe(take(1));

    let config = {
      font,
      size: 0.1,
      height: 0.01
    }
    let obj = new Object3D();
    let material = new MeshBasicMaterial({color: 0xababab});
    capitals.subscribe((data: any) => {
      let {properties: {name}, geometry:{coordinates: [long, lat]}} = data;
      // console.log(name, lat, long);
      //@ts-ignore
      let geometry = new TextBufferGeometry(name, config);
      let mesh = new Mesh(geometry, material);
      lonLatToVector3(long, lat, mesh.position);
      let temp = Object.create(mesh.position.multiplyScalar(10));
      mesh.lookAt(temp.multiplyScalar(2));
      // console.log(temp);
      obj.add(mesh);
    });

    Earth.object.add(obj);
  }
}
