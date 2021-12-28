import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { logIn, loginStart } from "../ActionDispatchers/authentication-actionDispatcher";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { authenticateService } from "../services/authentication.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class authEffects{

    constructor(private action:Actions,private httpService:HttpClient,private authService:authenticateService,private router:Router){}
    webAPI=environment.webApi;
    @Effect()
    authLogin=this.action.pipe(
        ofType("LOGINSTART"),
        switchMap((authData:loginStart) => {
            return this.httpService.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.webAPI,{
            email:authData.payload.email,
            password:authData.payload.password,
            returnSecureToken:true
            }).pipe(
                map((data => {
                    this.authService.updateSessionData(data);
                    let expirationDate=new Date(new Date().getTime() + +data.expiresIn * 1000);
                    let sessionDetails={...data,expirationDate:expirationDate};            
                    return new logIn({sessionDetails});
                }))
            )
        })
    );

    @Effect({dispatch:false})
    authSuccess=this.action.pipe(
        ofType("LOGIN"),
        tap(() => {
            this.router.navigateByUrl("/recipes");
        })
    );
}