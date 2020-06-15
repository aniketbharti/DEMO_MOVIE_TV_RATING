import { ActivatedRoute } from '@angular/router';
import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { imageURL, placeholderImage } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-page-details',
  templateUrl: './person-page-details.component.html',
  styleUrls: ['./person-page-details.component.scss']
})
export class PersonPageDetailsComponent implements OnInit {
  id: any;
  user: any;
  obserVableData: Observable<any>;

  constructor(private movieDbService: MoviesDbService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams.id;
    this.obserVableData = this.movieDbService.getPeopleDetail(this.id).pipe(tap((res) => {
      this.user = res
    }))
  }


  getImagePath() {
    if ("profile_path" in this.user) {
      return this.user.profile_path ? imageURL + this.user.profile_path : placeholderImage
    }
    return placeholderImage
  }

}
