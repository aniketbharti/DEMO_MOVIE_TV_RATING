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
    if (this.moviesList.length < 7) {
      let length = this.moviesList.length;
      for (let i = 0; i < 5 - length; i++) {
        let data = {
          adult: null,
          id: null,
          media_type: null,
          original_title: null,
          poster_path: null,
          vote_average: null,
          hidden: true
        }
        this.moviesList.push(data)
      }
    }
  }


  slickInit(e) { }


}
