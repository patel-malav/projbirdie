import * as THREE from "three";

// function getVector3(lat: number, long: number, alti = 0, radius = 10) {
//   radius += alti;
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (long + 180) * (Math.PI / 180);
//   return new Vector3(
//     -radius * Math.sin(phi) * Math.cos(theta),
//     radius * Math.cos(phi),
//     radius * Math.sin(phi) * Math.sin(theta)
//   );
// }

/**
 * converts a XYZ vector3 to longitude latitude (Direct Polar)
 * @param long longitude
 * @param lat latitude
 * @param out optional output vector3
 * @returns a unit vector of the 3d position
 */
function lonLatToVector3(long: number, lat: number, out?: THREE.Vector3) {
  out = out || new THREE.Vector3();

  const phi = (90 - lat) * (Math.PI / 180); // Phi angle from vector to z axis
  const theta = (long + 180) * (Math.PI / 180); // Theta angle from vector

  //distribute to sphere
  out.set(
    -Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  );
  return out;
}

/**
 * converts a XYZ THREE.Vector3 to longitude latitude. beware, the vector3 will be normalized!
 * @param vector3
 * @returns an array containing the longitude [0] & the lattitude [1] of the Vector3
 */
function vector3toLonLat(vector3) {
  vector3.normalize();

  //longitude = angle of the vector around the Y axis
  //-( ) : negate to flip the longitude (3d space specific )
  //- PI / 2 to face the Z axis
  var lng = -Math.atan2(-vector3.z, -vector3.x) - Math.PI / 2;

  //to bind between -PI / PI
  if (lng < -Math.PI) lng += Math.PI * 2;

  //latitude : angle between the vector & the vector projected on the XZ plane on a unit sphere

  //project on the XZ plane
  var p = new THREE.Vector3(vector3.x, 0, vector3.z);
  //project on the unit sphere
  p.normalize();

  //commpute the angle ( both vectors are normalized, no division by the sum of lengths )
  var lat = Math.acos(p.dot(vector3));

  //invert if Y is negative to ensure teh latitude is comprised between -PI/2 & PI / 2
  if (vector3.y < 0) lat *= -1;

  return [lng, lat];
}

/**
 * determines if a polyline contains a point
 * @param polygon a series of X,Y coordinates pairs
 * @param x point.x
 * @param y point.y
 * @returns true if the path contains the point, false otherwise
 */
function polygonContains(polygon, x, y) {
  var j = 0;
  var oddNodes = false;
  for (var i = 0; i < polygon.length; i += 2) {
    j = (j + 2) % polygon.length;

    var ix = polygon[i];
    var iy = polygon[i + 1];
    var jx = polygon[j];
    var jy = polygon[j + 1];

    if ((iy < y && jy >= y) || (jy < y && iy >= y)) {
      if (ix + ((y - iy) / (jx - ix)) * (jx - ix) < x) {
        oddNodes = !oddNodes;
      }
    }
  }
  return oddNodes;
}

/**
 * locateCamera: orients a camera to look at another object & preserve the camera's UP axis
 * @param target object to lookAt
 * @param camera object (camera) to position
 * @param camera_angle extra angle on the latitude
 * @param camera_distance distance between the target and the camera
 */
function locateCamera(target, camera, camera_angle, camera_distance) {
  var UP = new THREE.Vector3(0, 1, 0);
  var NORMAL = target.clone().normalize();

  var angle = Math.acos(UP.dot(NORMAL));
  angle += camera_angle || 0;

  if (angle > Math.PI) UP.y *= -1;
  if (angle < 0) angle += Math.PI;

  var AX = UP.crossVectors(UP, NORMAL);

  var tmp = new THREE.Vector3(0, 1, 0);
  tmp.applyAxisAngle(AX, angle);
  tmp.multiplyScalar(camera_distance).add(target);

  camera.position.copy(tmp);
  camera.lookAt(target);
}

export { lonLatToVector3, vector3toLonLat, polygonContains, locateCamera };
