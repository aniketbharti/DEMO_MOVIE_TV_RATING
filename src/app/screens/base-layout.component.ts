import { Router, ActivatedRoute } from '@angular/router';
import { LoginModalComponent } from './../login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDataService } from './../services/user.data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MoviesDbService } from '../services/movies-db.service';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {

  isHandset$: Observable<boolean>;
  isMenuShow: boolean = false;
  userDetails: any;
  token: any = null;


  constructor(private breakpointObserver: BreakpointObserver, private moviesDbService: MoviesDbService, private router: Router, private userDataService: UserDataService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userDetails = this.userDataService.getUserDetails()
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        tap(res => {
          this.isMenuShow = false
        }),
        map(result => result.matches),
        shareReplay()
      );
    this.token = this.activatedRoute.snapshot.queryParams.request_token;
    if (this.token) {
      let data = {
        token: this.token
      }
      this.userDataService.setUserDetails(JSON.stringify(data), 'local')
      const params = { ...this.activatedRoute.snapshot.queryParams };
      delete params.request_token
      delete params.approved
      this.router.navigate([], { queryParams: params });

    }

  }

  updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

  toggleMenu() {
    this.isMenuShow = !this.isMenuShow
  }

  loginModal() {
    this.dialog.open(LoginModalComponent, { width: '500px', height: '350px' }).afterClosed().subscribe((res)=>{
      if(res == "Success"){
        this.ngOnInit()
      }
    })
  }

  navigate() {
    this.router.navigate([''])
  }

  logout() {
    const data = this.dialog.open(ModalComponent, {
      width: "350px",
      data: {
        message: ["Are you sure you want to logout?\nAny unsaved data will be lost."],
        button: [{ text: "OK", class: "commonBtn" }, { text: "Cancel", class: "commonBtn2" }]
      }
    });
    data.afterClosed().subscribe((res) => {
      if (res == "OK") {
        let body = {
          session_id: this.userDataService.getUserDetails().token
        }
        this.moviesDbService.logOut(body).subscribe((data: any) => {
          if (data) {
            this.userDataService.logOutUser()
            this.ngOnInit()
            this.router.navigate([''])
          }
        });
      }
    })
  }

  grantAccess() {
    this.moviesDbService.getRequestToken().subscribe((res) => {
      window.location.href = 'https://www.themoviedb.org/authenticate/' + res.request_token + '?redirect_to=' + window.location.href
    })
  }

  navigateToMyRating() {
    this.router.navigate(['my-rated'])
  }


}

