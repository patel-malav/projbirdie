// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  graphql: `${window.location.protocol}//${window.location.hostname}:5555/graphql`,
};

export const colors = {
  surface: 0x02066f,
  focus: 0x00022e,
  danger: 0xff073a,
  minimal: 0xbff128,
  positive: 0x10a674,
  extreme: 0x2dfe54,
};

export const level = [
  0xf0fff0,
  0xd0f0c0,
  0xaddfad,
  0x00ff7f,
  0x77dd77,
  0x50c878,
  0x009e60,
  0x228b22,
  0x32cd32,
  0x3fff00,
  0x7cfc00,
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
