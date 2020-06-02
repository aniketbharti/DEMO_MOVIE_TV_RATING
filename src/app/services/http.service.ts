import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { tap, catchError } from 'rxjs/operators';
import { empty, throwError } from 'rxjs';
import { ErrorHttpServiceClass } from './error.http.service';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
    private loaderService: LoaderService,
    private errorHttpService: ErrorHttpServiceClass
  ) { }

  otherParameters = {
    loader: false,
    customError: 'none',
    serverError: 'none',
    statusCodeResolve: 'none'
  }

  postMethod(url, body, otherParamets?: any) {

    otherParamets = this.modifyotherParameters(otherParamets)
    this.loaderChange(otherParamets, true)

    return this.http.post(url, JSON.stringify(body)).pipe(
      tap((res: any) => {
        let error = this.checkForError(res);
        if (error) {
          throw new Error("Local Data Server Error : " + res.message)
        } else {
          this.loaderChange(otherParamets, false)
        }
      }),
      catchError((err: any) => {
        this.loaderChange(otherParamets, false)
        if (otherParamets.serverError == "custom") {
          return throwError(err)
        }
        let errData = {
          err: err,
          url
        }
        this.errorHttpService.errorHandling(errData, otherParamets)
        return empty();
      }))
  }

  patchMethod(url, body, otherParamets?: any) {

    otherParamets = this.modifyotherParameters(otherParamets)
    this.loaderChange(otherParamets, true)

    return this.http.patch(url, JSON.stringify(body)).pipe(
      tap((res: any) => {
        let error = this.checkForError(res);
        if (error) {
          if (otherParamets.customError != "custom") {
            throw new Error("Local Data Server Error : " + res.message)
          }
        } else {
          this.loaderChange(otherParamets, false)
        }
      }),
      catchError((err) => {
        this.loaderChange(otherParamets, false)
        if (otherParamets.serverError != "custom") {
          throwError(err)
        }
        let errData = {
          err,
          url
        }
        this.errorHttpService.errorHandling(errData, otherParamets)
        return empty();
      }))
  }

  deleteMethod(url, body, otherParamets?: any) {
    console.log(url)
    console.log(body)
    let httpParams = new HttpParams().set("session_id", body.session_id);

    otherParamets = this.modifyotherParameters(otherParamets)
    this.loaderChange(otherParamets, true)
    return this.http.delete(url, { params: httpParams }).pipe(
      tap((res: any) => {
        let error = this.checkForError(res);
        if (error) {
          if (otherParamets.customError != "custom") {
            throw new Error("Local Data Server Error : " + res.message)
          }
        } else {
          this.loaderChange(otherParamets, false)
        }
      }),
      catchError((err) => {
        this.loaderChange(otherParamets, false)
        if (otherParamets.serverError != "custom") {
          throwError(err)
        }
        let errData = {
          err,
          url
        }
        this.errorHttpService.errorHandling(errData, otherParamets)
        return empty();
      }))
  }

  getMethod(url, otherParamets?: any) {

    otherParamets = this.modifyotherParameters(otherParamets)
    this.loaderChange(otherParamets, true)

    return this.http.get(url).pipe(
      tap((res: any) => {
        let error = this.checkForError(res);
        if (error) {
          if (otherParamets.customError != "custom") {
            throw new Error("Local Data Server Error : " + res.message)
          }
        } else {
          this.loaderChange(otherParamets, false)
        }
      }),
      catchError((err) => {
        this.loaderChange(otherParamets, false)
        if (otherParamets.serverError != "custom") {
          throwError(err)
        }
        let errData = {
          err,
          url
        }
        this.errorHttpService.errorHandling(errData, otherParamets)
        return empty();
      }))
  }

  getMethodResponseParameter(url, response, otherParamets?: any) {

    otherParamets = this.modifyotherParameters(otherParamets)
    this.loaderChange(otherParamets, true)

    return this.http.get(url, response).pipe(
      tap((res: any) => {
        let error = this.checkForError(res);
        if (error) {
          if (otherParamets.customError != "custom") {
            throw new Error("Local Data Server Error : " + res.message)
          }
        } else {
          this.loaderChange(otherParamets, false)
        }
      }),
      catchError((err) => {
        this.loaderChange(otherParamets, false)
        if (otherParamets.serverError != "custom") {
          throwError(err)
        }
        let errData = {
          err,
          url
        }
        this.errorHttpService.errorHandling(errData, otherParamets)
        return empty();
      }))
  }

  putMethod(url, base64, otherParamets?: any) {

    otherParamets = this.modifyotherParameters(otherParamets)
    this.loaderChange(otherParamets, true)

    return this.http.put(url, JSON.stringify(base64)).pipe(
      tap((res: any) => {
        let error = this.checkForError(res);
        if (error) {
          if (otherParamets.customError != "custom") {
            throw new Error("Local Data Server Error : " + res.message)
          }
        } else {
          this.loaderChange(otherParamets, false)
        }
      }),
      catchError((err) => {
        this.loaderChange(otherParamets, false)
        if (otherParamets.serverError != "custom") {
          throwError(err)
        }
        let errData = {
          err,
          url
        }
        this.errorHttpService.errorHandling(errData, otherParamets)
        return empty();
      }))
  }



  checkForError(res) {
    if (typeof res === 'object') {
      if ("error" in res) {
        return true;
      }
    } else if (res == null) {
      return true
    }
    return false
  }


  loaderChange(otherParamets, onofStatus) {
    if (otherParamets.loader) {
      if (onofStatus) {
        this.loaderService.changeLoaderState({ state: true, location: 'global' })
      } else {
        this.loaderService.changeLoaderState({ state: false, location: 'global' })
      }
    }
  }


  modifyotherParameters(localotherParameters) {
    if (localotherParameters) {
      for (let key in this.otherParameters) {
        if (!(localotherParameters.hasOwnProperty(key))) {
          localotherParameters[key] = this.otherParameters[key]
        }
      }
      return localotherParameters;
    } else {
      return this.otherParameters;
    }
  }


}



export enum ErrorDisplay {
  page,
  modal,
  none,
  snackbar,
  custom
}


// let otherParameters = {
//   loader: {
//     showLoader: true,
//     errorHandlingMsg: "custom" 
//   },
//   error: {
//     className: "BuyerSellerLoginComponent",
//     methodName: "login"
//   }
// }