import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable()

export class ErrorHttpServiceClass {

    constructor(private loaderService: LoaderService,     
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        ) { }



    errorHandling(err, otherParameters) {
        let msg = err.err.message;
        console.log(err, otherParameters)
        if (msg.includes("Local Data Server Error : ")) {
            msg = msg.split(":")[1]
            if (otherParameters.customError == "modal") {
                this.modalOpen([msg])
            }else if (otherParameters.customError == "snack") {
                this.snackBarFunc(msg)
            }
        }else {
            if (otherParameters.serverError == "modal") {
                this.modalOpen([msg])
            }else if (otherParameters.serverError == "snack") {
                this.snackBarFunc(msg)
            }
        }
    }

    snackBarFunc(message) {
        this._snackBar.open(message, '', {
          duration: 3000,
        });
      }
    
    modalOpen(msg) {
        this.dialog.open(ModalComponent, {
            width: "350px",
            data: {
                message: msg,
                button: [{ text: "OK", class: "commonBtn" }]
            }
        })
    }

}
