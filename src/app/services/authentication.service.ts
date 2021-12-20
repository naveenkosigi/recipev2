import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { logIn, logOut } from "../ActionDispatchers/authentication-actionDispatcher";
import { appState } from "../AppState/appState";

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
    private storeObservable:Store<appState>
    constructor(private httpService:HttpClient,private router:Router,private store:Store<appState>){

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
        }));
    }

    updateSessionData(response):void{
        let expirationDate=new Date(new Date().getTime() + +response.expiresIn * 1000);
        this.sessionDetails={...response,expirationDate:expirationDate};
        this.store.dispatch(new logIn({sessionDetails:this.sessionDetails}));
        localStorage.setItem("cache",JSON.stringify(this.sessionDetails));
    }

    logOut() : void{
        localStorage.clear();
        this.sessionDetails=undefined;
        this.store.dispatch(new logOut());
        this.router.navigateByUrl("/authenticate");
    }

    autoLogin() : void{
        this.sessionDetails=<sessionModel>JSON.parse(localStorage.getItem("cache"));
        if(this.sessionDetails){
            this.sessionDetails.expirationDate=new Date(this.sessionDetails.expirationDate);
            if(new Date()<this.sessionDetails.expirationDate){
                this.store.dispatch(new logIn({sessionDetails:this.sessionDetails}));
                return;
            }
        }

        localStorage.clear();
        this.sessionDetails=undefined;
        this.store.dispatch(new logOut());
        this.router.navigateByUrl("/authenticate");
    }
}