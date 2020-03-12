import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EngineService } from './engine.service';

@Component({
  selector: 'pb-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  public renderCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private engServ: EngineService) { }

  ngOnInit(): void {
    this.engServ.init(this.renderCanvas);
    this.engServ.animate();
    this.engServ.showEarth();
    // this.engServ.showBird({id: 'malav', geo:{lat: 30, long: 60.4}});
  }
}
