import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Observable } from 'rxjs';
import { CanvasService } from 'src/app/explore/canvas/canvas.service';

@Component({
  selector: 'pb-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  public term: string;

  obs: Observable<any>;
  constructor(private dataServ: DataService, private canvasServ: CanvasService) { }

  ngOnInit(): void { }
  
  search(value: string) {
    let id = value.match(/[0-9]*/).pop();
    if(id) {
      // this.obs = this.dataServ.getObservation(id);
      // this.canvasServ.showObservation(id);
    } else {
      console.log(`idiot ${value} is not a Id`);
    }
  }

}
