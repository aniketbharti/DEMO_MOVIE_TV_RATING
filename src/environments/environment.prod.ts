const domainURL = "https://api.themoviedb.org/3/";
const apiKey = 'cd63cd689d23720b0bdbe5ede4f0c2ec';
export const placeholderImage = 'https://bulma.io/images/placeholders/480x640.png'

const appName = {
  trendingApp: 'trending/{parameter}?api_key=',
  searchApp: 'search/{parameter}?api_key=',
  popularMovieApp: 'movie/popular?api_key=',
  popularTVApp: 'tv/popular?api_key=',
  tokenApp: 'authentication/token/new?api_key=',
  loginApp: 'authentication/token/validate_with_login?api_key=',
  getMovieDetails: '{parameter1}/{parameter2}?api_key=',
  ratingApp: '{parameter1}/{parameter2}/rating?api_key=',
  recommendationApp: '{parameter1}/{parameter2}/recommendations?api_key=',
  createSession: 'authentication/session/new?api_key=',
  logOut: 'authentication/session?api_key=',
  myRated: 'account/{account_id}/rated/{parameter2}?api_key=',
  reviewState: '{parameter1}/{parameter2}/account_states?api_key='

}
export const imageURLHD = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/'
export const imageURL = 'https://image.tmdb.org/t/p/w220_and_h330_face'


export const environment = {
  production: false,
  trendingUrl: domainURL + appName.trendingApp + apiKey,
  searchMoviesTV: domainURL + appName.searchApp + apiKey,
  popularMovie: domainURL + appName.popularMovieApp + apiKey,
  popularTV: domainURL + appName.popularTVApp + apiKey,
  getToken: domainURL + appName.tokenApp + apiKey,
  login: domainURL + appName.loginApp + apiKey,
  getMovieDetails: domainURL + appName.getMovieDetails + apiKey,
  sendRating: domainURL + appName.ratingApp + apiKey,
  getrecommendation: domainURL + appName.recommendationApp + apiKey,
  createSession: domainURL + appName.createSession + apiKey,
  logOut: domainURL + appName.logOut + apiKey,
  myRated:  domainURL + appName.myRated + apiKey,
  reviewState: domainURL + appName.reviewState + apiKey

};
