import { UserDataService } from './../services/user.data.service';
import { MoviesDbService } from './../services/movies-db.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  logInForm: FormGroup;
  message: string;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private moviesDbService: MoviesDbService,
    private userDataService: UserDataService,
    private _snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) {
  }

  ngOnInit() {
    this.logInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.
        pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
    this.logInForm.get('email').patchValue('aniketvrm183@gmail.com')
    this.logInForm.get('password').patchValue('123456789')

  }

  get f() {
    return this.logInForm.controls;
  }

  login() {
    let details = this.userDataService.getUserDetails();

    let body = {
      username: this.logInForm.controls.email.value,
      password: this.logInForm.controls.password.value,
      request_token: details.token
    }

    this.moviesDbService.loginUser(body).subscribe((loginResp) => {
      if (loginResp.success) {
        let body = {
          request_token: details.token
        }
        this.moviesDbService.createSession(body).subscribe((res) => {
          if(!res.success){
            this.snackBarFunc("Please Try Again Later")
          }else{
            let data = {
              token: res.session_id,
              email: this.logInForm.controls.email.value,
              expires: loginResp.expires_at,
              islogin: true,
            }
            this.userDataService.setUserDetails(JSON.stringify(data), 'local')
            this.snackBarFunc("Loggin Successfully")
            this.dialogRef.close("Success")
          }
        })

      } else {
        this.snackBarFunc("Please Check Your Credentials")
      }
    })

  };

  snackBarFunc(message) {
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbarclass']
    });
  }

}
