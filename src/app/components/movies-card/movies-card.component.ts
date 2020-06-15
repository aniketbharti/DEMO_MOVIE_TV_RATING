import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movies-card',
  templateUrl: './movies-card.component.html',
  styleUrls: ['./movies-card.component.scss']
})
export class MoviesCardComponent implements OnInit {

  @Input() cardData: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigationToPDP(id, media_type) {
    if(!("personPageNavigation" in this.cardData)){
      this.router.navigate(['movie-description'], { queryParams: { id: id, media_type: media_type } })
    }else{
      this.router.navigate(['person-details'], { queryParams: { id: id}})
    }
  }

  

}
