import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { imageURL } from 'src/environments/environment.prod';
import { imageURLHD } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pdp-page',
  templateUrl: './pdp-page.component.html',
  styleUrls: ['./pdp-page.component.scss']
})
export class PdpPageComponent implements OnInit {
  id: any;
  response: any;
  media_type: any;
  recommendeArray: any[] = [];
  defaultTab = 'rating'
  ratingForm: FormGroup;
  buttonText: string = 'Submit';
  constructor(private moviesDbService: MoviesDbService, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    
    this.activatedRoute.queryParams.subscribe((res) => {
      this.id = this.activatedRoute.snapshot.queryParams.id;
      this.media_type = this.activatedRoute.snapshot.queryParams.media_type;
      this.getMoviesDetails();
      if (this.media_type == 'tv' || this.media_type == 'movie') {
        this.getRecommended()
      }
      this.ratingForm = this.formBuilder.group({
        rating: [null, [Validators.required, Validators.min(0.1), Validators.max(10)]],
      });
    })
    this.checkState(this.id,this.media_type)

  }

  getMoviesDetails() {
    let body = {
      append_to_response: 'videos,images'
    }
    this.moviesDbService.getMovieDetails(this.media_type, this.id, body).subscribe((res) => {
      res['backdrop_path'] = imageURLHD + res['backdrop_path']
      res['poster_path'] = imageURL + res['poster_path']
      res['name_data'] = res.title ? res.title : res.original_title ? res.original_title : res.name,
        this.response = res;
    })
  }

  getUrl() {
    return "url('" + this.response['backdrop_path'] + "')";
  }

  getGenres(data) {
    if (data) {
      data = data.map(data => data.name)
      return data.join(" , ")
    }
    return ''
  }

  get f() {
    return this.ratingForm.controls;
  }

  getRecommended() {
    this.moviesDbService.getRecommended(this.media_type, this.id).subscribe((res) => {
      let tempArr = []
      res.results.forEach(element => {
        let data = {
          adult: element.adult,
          id: element.id,
          media_type: this.media_type,
          original_title: element.title ? element.title : element.original_title ? element.original_title : element.name,
          poster_path: imageURL + element.poster_path,
          vote_average: element.vote_average
        }
        tempArr.push(data)
      });
      console.log(tempArr, "pop")

      this.recommendeArray = tempArr;
    })

  }

  formValidSubmit() {
    if (this.ratingForm.valid) {
      let body = {
        value: this.ratingForm.get('rating').value
      }
      this.moviesDbService.sendRating(this.media_type, this.id, body).subscribe((res) => {
        if("status_message" in res){
          this.snackBarFunc('Rating Submitted Successfully')
        }else{
          this.snackBarFunc('Some Error Occured')
        }
      })
    } else {
      this.ratingForm.markAllAsTouched()
    }
  }

  snackBarFunc(message) {
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbarclass']
    });
  }

  checkState(id, media){
    this.moviesDbService.getReviewState(id,media).subscribe((res)=>{
      if("rated" in res){
        if(!(typeof(res['rated']) == "boolean")){
          this.ratingForm.get('rating').patchValue(res.rated.value)
          this.buttonText = 'Update'
        }
      }
      console.log(res)
    })
  }

}
