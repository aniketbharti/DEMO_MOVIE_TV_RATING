import { ActivatedRoute } from '@angular/router';
import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { imageURL, placeholderImage } from 'src/environments/environment';

@Component({
  selector: 'app-person-page-details',
  templateUrl: './person-page-details.component.html',
  styleUrls: ['./person-page-details.component.scss']
})
export class PersonPageDetailsComponent implements OnInit {
  id: any;
  user: any;

  constructor(private movieDbService: MoviesDbService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams.id;
    this.movieDbService.getPeopleDetail(this.id).subscribe((res)=>{
      this.user = res
    })
  }


  getImagePath(){
    return this.user.profile_path ? imageURL + this.user.profile_path : placeholderImage
  }

}
