import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class authenticateService{
    constructor(private httpService:HttpClient){

    }
    signUp(email:string,password:String){
        this.httpService.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC6SJDKQ2B5NIknJOYko0abZsk76N1y22Q',{
            email:email,
            password:password,
            returnSecureToken:true
        }).subscribe();
    }
}