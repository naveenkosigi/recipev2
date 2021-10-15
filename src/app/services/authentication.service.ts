import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class authenticateService{
    isLoggedIn:boolean=false;
    sessionDetails:object;
    constructor(private httpService:HttpClient){

    }
    signUp(email:string,password:String) : Observable<any>{
        return this.httpService.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC6SJDKQ2B5NIknJOYko0abZsk76N1y22Q',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap(data => {
            this.isLoggedIn=true;
            this.sessionDetails=data;
            console.log(this.isLoggedIn,data);
        }));
    }
}