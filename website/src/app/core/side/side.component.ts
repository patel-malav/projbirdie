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

  obs: Observable<any>;
  constructor(private dataServ: DataService, private canvasServ: CanvasService) { }

  ngOnInit(): void {
    this.obs = this.dataServ.getObservation('39667810');
    this.canvasServ.showObservation('39667810');
  }
}
