import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";

export interface sessionModel{
    displayName:string,
    email:string,
    expiresIn:string,
    idToken:string,
    kind:string,
    localId:string,
    refreshToken:string,
    registered:string,
    expirationDate:Date
}

@Injectable({providedIn:'root'})
export class authenticateService{
    isLoggedIn:boolean=false;
    sessionDetails:sessionModel;
    private webAPI:string='AIzaSyC6SJDKQ2B5NIknJOYko0abZsk76N1y22Q';
    sessionSubject:Subject<boolean>=new Subject();
    constructor(private httpService:HttpClient,private router:Router){

    }
    signUp(email:string,password:String) : Observable<any>{
        return this.httpService.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + this.webAPI,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap(data => {
            this.isLoggedIn=true;
            this.updateSessionData(data);
            console.log(this.isLoggedIn,data);
            this.sessionSubject.next(true);
        }));
    }

    logIn(email:string,password:String) : Observable<any>{
        return this.httpService.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.webAPI,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap(data => {
            this.isLoggedIn=true;
            this.updateSessionData(data);
            console.log('loggedIn');
            console.log(this.sessionDetails);
            this.sessionSubject.next(true);
        }));
    }

    updateSessionData(response):void{
        let expirationDate=new Date(new Date().getTime() + +response.expiresIn * 1000);
        this.sessionDetails={...response,expirationDate:expirationDate};
        localStorage.setItem("cache",JSON.stringify(this.sessionDetails));
    }

    logOut() : void{
        localStorage.clear();
        this.sessionDetails=undefined;
        this.sessionSubject.next(false);
        this.router.navigateByUrl("/authenticate");
    }

    autoLogin() : void{
        this.sessionDetails=<sessionModel>JSON.parse(localStorage.getItem("cache"));
        if(this.sessionDetails){
            this.sessionDetails.expirationDate=new Date(this.sessionDetails.expirationDate);
            if(new Date()<this.sessionDetails.expirationDate){
                this.sessionSubject.next(true);
                return;
            }
        }

        localStorage.clear();
        this.sessionDetails=undefined;
        this.sessionSubject.next(false);
        this.router.navigateByUrl("/authenticate");
    }
}