import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CanvasService } from 'src/app/explore/canvas/canvas.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pb-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  public term: string;
  public data: Observable<any>;

  obs: Observable<any>;
  constructor(private apollo: Apollo ,private canvasServ: CanvasService) { }

  ngOnInit(): void { }
  
  search(value: string) {
    this.data = this.apollo.query<any>({query: gql`{search(term:"${value}"){id name images{square}}}`}).pipe(map(resp => {
      console.log(resp.data);
      return resp.data.search
    }));
      // this.obs = this.dataServ.getObservation(id);
      // this.canvasServ.showObservation(id);
  }

}
