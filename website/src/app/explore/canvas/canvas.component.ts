import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Explorer from '../explorer';
import Earth from '../objects/earth';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'pb-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;

  explorer: Explorer;
  earth: Earth;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  constructor(public data: DataService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.explorer = new Explorer(this.canvas);
    this.earth = new Earth(100, 32);
    this.explorer.add(this.earth.mesh);
  }
}
