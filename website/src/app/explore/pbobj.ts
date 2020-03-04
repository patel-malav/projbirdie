export interface Pbobj {
    animate: boolean;
    mesh: any;
    geometry: any;
    material: any;
    draw(): void;
    update(): void;
}
