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
  // private birds: Bird[] = [];
  private subscriptions: Subscription[] = [];

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  constructor(private canvasService: CanvasService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.explorer = new Explorer(this.canvas);
    this.earth = new Earth(100, 32);
    this.explorer.add(this.earth.mesh);

    // Subscibe to show observation command
    {
      let sub = this.canvasService.observation$.subscribe({
        next: ({lat, long}) => {
          let bird = new Bird();
          bird.location(lat, long);
          // this.birds.push(bird);
          this.earth.mesh.add(bird.mesh)
        },
        error: (err) => console.log(`error in observation subsription canvas component`),
        complete: () => console.log(`done!!!<- with observation subscription`)
      })
      this.subscriptions.push(sub);
    }
    // Subscribe to clear command
    {
      let sub = this.canvasService.clear$.subscribe({
        next: (value) => {
          if(value === 'all') {
            let children = this.earth.mesh.children;
            console.log(`removing childrens total - ${children.length}`);
            for(let i = children.length - 1; i >= 0; i--) {
              console.log(`removing - ${i}`);
              this.earth.mesh.remove(children[i]);
            }
          }
        },
        error: (err) => console.log(`error in clear subscription canvas component`),
        complete: () => console.log(`done!!!<- with clear subsription`)
      });
      this.subscriptions.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
