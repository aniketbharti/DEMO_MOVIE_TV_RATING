import { UserDataService } from './../../services/user.data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesDbService } from './../../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { imageURL } from 'src/environments/environment.prod';
import { imageURLHD, placeholderImage } from 'src/environments/environment';
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
  createdBy = [];

  constructor(private moviesDbService: MoviesDbService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private userDataService: UserDataService
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((res) => {
      this.id = this.activatedRoute.snapshot.queryParams.id;
      this.media_type = this.activatedRoute.snapshot.queryParams.media_type;
      if (!(this.id && this.media_type)) {
        this.router.navigate([''])
      }
      this.getMoviesDetails();
      if (this.media_type == 'tv' || this.media_type == 'movie') {
        this.getRecommended()
      }
      this.ratingForm = this.formBuilder.group({
        rating: [null, [Validators.required, Validators.min(0.1), Validators.max(10)]],
      });
      let check = this.checkLogin()
      if (check) {
        this.checkState(this.id, this.media_type)
      }
    })

  }

  checkLogin() {
    let data = this.userDataService.getUserDetails()
    if (data) {
      if (data.islogin) {
        return true
      }
    }
    return false;
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
      if ("created_by" in res) {
        res.created_by.forEach(element => {
          let data = {
            original_title: element.name,
            poster_path:element.profile_path ? imageURL + element.profile_path : placeholderImage,
            personPageNavigation: true,
            id: element.id
          }
          this.createdBy.push(data)
        });
      }
    })
  }

  // https://image.tmdb.org/t/p/w138_and_h175_face/fmRHI0ovny7lk27TzejA47or802.jpg" sr

  // https://image.tmdb.org/t/p/w220_and_h330_faceundefined

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
          poster_path: element.poster_path ? imageURL + element.poster_path : placeholderImage,
          vote_average: element.vote_average
        }
        tempArr.push(data)
      });
      this.recommendeArray = tempArr;
    })

  }

  formValidSubmit() {
    let check = this.checkLogin()
    if (this.ratingForm.valid) {
      if (check) {
        let body = {
          value: this.ratingForm.get('rating').value
        }
        this.moviesDbService.sendRating(this.media_type, this.id, body).subscribe((res) => {
          if ("status_message" in res) {
            this.snackBarFunc('Rating Submitted Successfully')
          } else {
            this.snackBarFunc('Some Error Occured')
          }
        })
      } else {
        this.snackBarFunc('Please Login to submit your ratings')
      }
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

  checkState(id, media) {
    this.moviesDbService.getReviewState(id, media).subscribe((res) => {
      if ("rated" in res) {
        if (!(typeof (res['rated']) == "boolean")) {
          this.ratingForm.get('rating').patchValue(res.rated.value)
          this.buttonText = 'Update'
        }
      }
      console.log(res)
    })
  }

}
