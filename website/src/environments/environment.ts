// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  graphql: `${window.location.protocol}//${window.location.hostname}:5555/graphql`
};

export const colors = {
  surface: 0x02066F,
  focus: 0x00022E,
  danger: 0xFF073A,
  minimal: 0xBFF128,
  positive: 0x10A674,
  extreme: 0x2DFE54
}

export const level = [
  0xF0FFF0,
  0xD0F0C0,
  0xADDFAD,
  0x00FF7F,
  0x77DD77,
  0x50C878,
  0x009E60,
  0x228B22,
  0x32CD32,
  0x3FFF00,
  0x7CFC00
]

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
