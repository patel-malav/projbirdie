import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pb-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  obs: Observable<any>;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.obs = this.data.getObservation('32860312');
  }
}
