import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Explorer from '../explorer';
import Earth from '../objects/earth';
import { CanvasService } from './canvas.service';
import Bird from '../objects/bird';

@Component({
  selector: 'pb-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;
  private explorer: Explorer;
  private earth: Earth;
  private subscriptions: Subscription[] = [];

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  constructor(public canvasService: CanvasService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.explorer = new Explorer(this.canvas);
    this.earth = new Earth(100, 32);
    this.explorer.add(this.earth.mesh);

    // Subscibe to observations
    {
      let sub = this.canvasService.observations$.subscribe({
        next: ({lat, long}) => {
          let bird = new Bird();
          bird.location(lat, long);
          this.earth.mesh.add(bird.mesh)
        },
        error: (err) => console.log(err),
        complete: () => console.log(`done!!!<- with observation`)
      })
      this.subscriptions.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
