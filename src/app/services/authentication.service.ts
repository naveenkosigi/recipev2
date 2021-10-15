import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class authenticateService{
    isLoggedIn:boolean=false;
    sessionDetails;
    private webAPI:string='AIzaSyC6SJDKQ2B5NIknJOYko0abZsk76N1y22Q';
    constructor(private httpService:HttpClient){

    }
    signUp(email:string,password:String) : Observable<any>{
        return this.httpService.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + this.webAPI,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap(data => {
            this.isLoggedIn=true;
            this.sessionDetails=data;
            console.log(this.isLoggedIn,data);
        }));
    }

    logIn(email:string,password:String) : Observable<any>{
        return this.httpService.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.webAPI,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap(data => {
            this.isLoggedIn=true;
            this.sessionDetails=data;
            console.log('loggedIn');
            console.log(this.sessionDetails);
        }));
    }
}