import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { imageURL, placeholderImage } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-rated-movies-list',
  templateUrl: './my-rated-movies-list.component.html',
  styleUrls: ['./my-rated-movies-list.component.scss']
})
export class MyRatedMoviesListComponent implements OnInit {

  defaultTab = 'movies';
  page = 1;
  myRating
  myRatingObj: { count: any; data: any[]; };
  searchObserable: Observable<any>;
  errorObject: any;
  constructor(private moviesDBService: MoviesDbService) { }

  ngOnInit() {
    this.myRatedData(this.defaultTab)
  }

  myRatedData(defaultTab) {
    this.defaultTab = defaultTab;
    this.searchObserable = this.moviesDBService.myRatedData(defaultTab).pipe(tap(
      (res: any) => {
        let tempArr = []
        res.results.forEach(element => {
          let data = {
            adult: element.adult,
            id: element.id,
            media_type: this.defaultTab == 'movies' ? 'movie' : 'tv',
            original_title: element.title ? element.title : element.original_title ? element.original_title : element.name,
            poster_path: element.poster_path ? imageURL + element.poster_path : placeholderImage,
            vote_average: element.vote_average
          }
          tempArr.push(data)
        });
        this.myRatingObj = {
          count: res.total_results,
          data: tempArr
        }
      }
    ), catchError(err => {
      this.errorObject = err
      return null
    }))


  }

  loadPage($event) {
  }


}
