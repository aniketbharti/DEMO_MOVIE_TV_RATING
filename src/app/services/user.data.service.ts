import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {
    constructor(){}

    getUserDetails() {
        if (sessionStorage.getItem("userDetails")) {
            return JSON.parse(sessionStorage.getItem("userDetails"))
        } else if (localStorage.getItem("userDetails")) {
            return JSON.parse(localStorage.getItem("userDetails"))
        }
        return null
    }

    setUserDetails(userData, storage) {
        if (storage == 'local') {
            localStorage.setItem("userDetails", userData);
        } else {
            sessionStorage.setItem("userDetails", userData);
        }
    }
    
    logOutUser(){
        localStorage.clear()
        sessionStorage.clear()
    }
}
