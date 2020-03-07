import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import Explorer from '../explorer';

@Component({
  selector: 'pb-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    new Explorer(this.canvas).setup();
  }
}
