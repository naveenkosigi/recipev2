import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY} from "rxjs";
import { logOut } from "../ActionDispatchers/authentication-actionDispatcher";
import { appState } from "../AppState/appState";
import { authenticateService } from "../services/authentication.service";

@Injectable()
export class authInterceptor implements HttpInterceptor{
    constructor(private authService:authenticateService,private router:Router,private store:Store<appState>){

    }
    intercept(httpRequest:HttpRequest<any>,next:HttpHandler){
        let toReturn:HttpRequest<any>;
        console.log(httpRequest);
        if(!httpRequest.url.startsWith("https://identitytoolkit.googleapis.com/") && httpRequest.responseType !== "blob"){
            if(new Date()>=this.authService.sessionDetails.expirationDate){
                this.store.dispatch(new logOut());
                this.router.navigateByUrl("/authenticate");
                this.authService.sessionDetails=undefined;
                return EMPTY;
            }
            toReturn=httpRequest.clone({
                params:httpRequest.params.append("auth",this.authService.sessionDetails.idToken)
            });
        }
        else{
            toReturn=httpRequest.clone();
        }
        return next.handle(toReturn);
    }
}