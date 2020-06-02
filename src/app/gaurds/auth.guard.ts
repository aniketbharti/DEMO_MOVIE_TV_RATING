import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { UserDataService } from '../services/user.data.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private userDataService: UserDataService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let data = this.userDataService.getUserDetails()
    if (data) {
      if (data.islogin) {
        return true
      }
    }
    this.router.navigate([''])
    return false
  }


}
