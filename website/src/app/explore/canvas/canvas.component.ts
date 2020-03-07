import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Apollo } from 'apollo-angular';
import Explorer from '../explorer';
import Earth from '../objects/earth';
import gql from 'graphql-tag';

@Component({
  selector: 'pb-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;
  @ViewChild('interface') private interfaceRef: ElementRef;

  explorer: Explorer;
  earth: Earth;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.explorer = new Explorer(this.canvas);
    this.earth = new Earth(100, 32);
    this.explorer.add(this.earth.mesh);
    this.showObservation('32860312')
  }

  showObservation(id: string) {
    this.apollo.query({
      query: gql`{observation(id: ${id}){user{id name} bird{id} geo{lat long} images{url}}}`
    })
    .subscribe(resp => console.log(resp.data));
  }
}
