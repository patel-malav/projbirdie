import { Component } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'website';
  constructor(public data: DataService) { }
}
