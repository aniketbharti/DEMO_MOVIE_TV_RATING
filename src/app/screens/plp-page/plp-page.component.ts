import { imageURL } from './../../../environments/environment.prod';
import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { placeholderImage } from 'src/environments/environment';


@Component({
  selector: 'app-plp-page',
  templateUrl: './plp-page.component.html',
  styleUrls: ['./plp-page.component.scss']
})
export class PlpPageComponent implements OnInit {
  searchText: string
  displayData: { count: any; data: any[]; selected: string; };
  page = 1;
  currentPage = 'multi';
  countObject = {
    multi: null,
    movie: null,
    tv: null,
    collection: null
  }

  constructor(private activateRoute: ActivatedRoute, private moviesDbService: MoviesDbService, private router: Router) {

  }

  ngOnInit() {
    this.searchText = this.activateRoute.snapshot.queryParams.search;
    if(!(this.searchText)){
      this.router.navigate([''])
    }
    this.search('multi');
    this.search('movie');
    this.search('tv');
    this.search('collection');
  }

  search(field, page?: any, isChange?: any) {
    let body = {
      query: this.searchText ? this.searchText.toLowerCase() : this.searchText
    }
    if(page){
      body['page'] = page
    }
    if (isChange) {
      this.currentPage = field
    }
    this.moviesDbService.searchMovies(body, field).subscribe((results) => {
      if (results) {
        let tempObject = []

        results.results.forEach(element => {
          if ("media_type" in element) {
            if (element.media_type == 'movie' || element.media_type == 'tv') {
              let obj = {
                id: element.id,
                name: element.title ? element.title : element.original_title ? element.original_title : element.name,
                overview: element.overview,
                release_date: element.release_date,
                media_type: element.media_type,
                poster_path: element.poster_path ? imageURL + element.poster_path : placeholderImage
              }
              tempObject.push(obj)
            }
          } else {
            let obj = {
              id: element.id,
              name: element.title ? element.title : element.original_title ? element.original_title : element.name,
              overview: element.overview,
              release_date: element.release_date,
              media_type: field,
              poster_path: element.poster_path ? imageURL + element.poster_path : placeholderImage
            }
            tempObject.push(obj)
          }
        })
        this.countObject[field] = results.total_results;

        if (field == this.currentPage) {
          this.displayData = {
            count: results.total_results,
            data: tempObject,
            selected: field
          }
        }
        console.log(this.displayData)

      }
    })
  }
  navigationToPDP(id, media_type) {
    this.router.navigate(['movie-description'], { queryParams: { id: id, media_type: media_type } })
  }

}
