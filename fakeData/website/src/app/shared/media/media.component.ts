import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  @Input('url') url: string = '';
  @Input('img') img: string = 'assets/placeholder_64.png';
  @Input('title') title: string = 'Loading ...';

  constructor() { }

  ngOnInit(): void {}

}
