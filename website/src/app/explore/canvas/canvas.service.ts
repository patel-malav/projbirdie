import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from 'src/app/shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  constructor(private apollo: Apollo, private data: DataService) { }

  showObservation() {
    this.data.getObservation('32860312').subscribe(data => {
      console.log(data);
    });
  }
}
