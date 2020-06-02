import { UserDataService } from './../../services/user.data.service';
import { imageURL, placeholderImage } from './../../../environments/environment';
import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { corouselInterface } from 'src/app/global-model/courousel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  autoCompleteControl = new FormControl();
  filteredOptions: Observable<string[]>;
  trendingType = 'all';
  trendingValidity = 'week';
  popularItem = 'movie';
  trendingArray: corouselInterface[] = [];
  public httpGetData$: Observable<any> = null;
  popularArray: corouselInterface[] = [];
  searchText: string = '';


  constructor(private moviesDbService: MoviesDbService, private router: Router, private userDataService: UserDataService) { }

  ngOnInit() {
    this.httpGetData$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value !== '') {
          return this.searchMovies(value);
        } else {
          return of(null);
        }
      })
    )
    this.getTrendingProducts('day');
    this.getPopularItemsMethod('movie');

  }

  changeSearchText(value: string) {
    this.searchText = value
  }

  getTrendingProducts(field) {
    this.trendingValidity = field
    this.moviesDbService.getTrendingProducts(this.trendingType, this.trendingValidity).subscribe((res) => {
      let tempArr = []
      res.results.forEach(element => {
        let data = {
          adult: element.adult,
          id: element.id,
          media_type: element.media_type,
          original_title: element.title ? element.title : element.original_title ? element.original_title : element.name,
          poster_path: element.poster_path ? imageURL + element.poster_path : placeholderImage,
          vote_average: element.vote_average
        }
        tempArr.push(data)
      });
      console.log(tempArr,"trending")
      this.trendingArray = tempArr
    })
  }



  searchMovies(value: string): Observable<any> {
    let body = {
      query: value ? value.toLowerCase() : value
    }
    return this.moviesDbService.searchMovies(body, 'multi').pipe(
      map(results => {
        let tempObject = []
        let data = results.results.filter(value => value.media_type == 'movie' || value.media_type == 'tv')
        data.forEach(element => {
          let obj = {
            id: element.id,
            media_type: element.media_type,
            name: element.title ? element.title : element.original_title ? element.original_title : element.name
          }
          tempObject.push(obj)
        });
        return tempObject
      }),
      catchError(_ => {
        return of(null);
      }))
  }


  getPopularItemsMethod(opt) {
    this.popularItem = opt
    this.moviesDbService.gerPopularItems(opt).subscribe((res) => {
      let tempArr = []
      res.results.forEach(element => {
        let data = {
          adult: element.adult,
          id: element.id,
          media_type: this.popularItem,
          original_title: element.title ? element.title : element.original_title ? element.original_title : element.name,
          poster_path: element.poster_path ? imageURL + element.poster_path : placeholderImage,
          vote_average: element.vote_average
        }
        tempArr.push(data)
      });
      console.log(tempArr,"pop")

      this.popularArray = tempArr;
    })
  }

  navigationToPDP(id, media_type) {
    this.router.navigate(['movie-description'], { queryParams: { id: id, media_type: media_type } })
  }

  navigationToPLP() {
    if (this.searchText != '') {
      this.router.navigate(['search'], { queryParams: { search: this.searchText } })
    }
  }


}



