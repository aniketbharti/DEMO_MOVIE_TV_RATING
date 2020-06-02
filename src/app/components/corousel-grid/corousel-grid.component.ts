import { Component, OnInit, Input } from '@angular/core';
import { corouselSlideConfig } from './corousel.config';
import { corouselInterface } from 'src/app/global-model/courousel.model';

@Component({
  selector: 'app-corousel-grid',
  templateUrl: './corousel-grid.component.html',
  styleUrls: ['./corousel-grid.component.scss']
})

export class CorouselGridComponent implements OnInit {

  @Input() moviesList: corouselInterface[];
  slideConfig = corouselSlideConfig;
  constructor() { }

  ngOnInit() {
    console.log(this.moviesList)
  }


  slickInit(e) { }


}
