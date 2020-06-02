import { UserDataService } from './user.data.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesDbService {

  constructor(private httpService: HttpService, private user: UserDataService) { }


  getTrendingProducts(mediaType, sortBy) {
    let url = environment.trendingUrl.replace('{parameter}', `${mediaType}/${sortBy}`)
    return this.httpService.getMethod(url)
  }

  searchMovies(body, field: string) {
    let url = environment.searchMoviesTV.replace('{parameter}', `${field}`)
    return this.httpService.getMethodResponseParameter(url, { params: body });
  }

  gerPopularItems(option) {
    let url = null;
    if (option == 'tv') {
      url = environment.popularTV
    } else {
      url = environment.popularMovie
    }
    return this.httpService.getMethod(url)
  }


  getRequestToken() {
    return this.httpService.getMethod(environment.getToken)
  }

  loginUser(body) {
    let otherParameter = {
      loader: true,
      customError: 'custom',
      serverError: 'custom'
    }
    return this.httpService.postMethod(environment.login, body, otherParameter)
  }

  getMovieDetails(param1, param2, body) {
    let url = environment.getMovieDetails.replace('{parameter1}', `${param1}`)
    url = url.replace('{parameter2}', `${param2}`)
    return this.httpService.getMethodResponseParameter(url, { params: body })
  }



  sendRating(param1, param2, body) {
    let data = this.user.getUserDetails();
    let url = environment.sendRating.replace('{parameter1}', `${param1}`)
    url = url.replace('{parameter2}', `${param2}`)
    url = url + '&session_id=' + data.token;
    return this.httpService.postMethod(url, body)
  }

  getRecommended(param1, param2) {
    let url = environment.getrecommendation.replace('{parameter1}', `${param1}`)
    url = url.replace('{parameter2}', `${param2}`)
    return this.httpService.getMethod(url)
  }

  createSession(body) {
    let otherParameter = {
      loader: true,
      customError: 'custom',
      serverError: 'custom'
    }
    return this.httpService.postMethod(environment.createSession, body, otherParameter)
  }

  logOut(body) {
    let otherParameter = {
      loader: true
    }
    return this.httpService.deleteMethod(environment.logOut, body, otherParameter)
  }

  myRatedData(params) {
    let otherParameter = {
      serverError: 'custom',
    }
   let url = environment.myRated.replace('{parameter2}', `${params}`)
    url = url +'&session_id='+ this.user.getUserDetails().token
    return this.httpService.getMethod(url, otherParameter)
  }

  getReviewState(param,param2){
    let url = environment.reviewState.replace('{parameter2}', `${param}`)
    url = url.replace('{parameter1}', `${param2}`)
    url = url +'&session_id='+ this.user.getUserDetails().token
    return this.httpService.getMethod(url)
  }

}

