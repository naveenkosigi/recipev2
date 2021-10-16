import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, empty } from "rxjs";
import { authService } from "../services/auth.service";
import { authenticateService } from "../services/authentication.service";

@Injectable()
export class authInterceptor implements HttpInterceptor{
    constructor(private authService:authenticateService,private router:Router){

    }
    intercept(httpRequest:HttpRequest<any>,next:HttpHandler){
        let toReturn:HttpRequest<any>;
        console.log(httpRequest);
        if(!httpRequest.url.startsWith("https://identitytoolkit.googleapis.com/") && httpRequest.responseType !== "blob"){
            if(new Date()>=this.authService.sessionDetails.expirationDate){
                this.authService.sessionSubject.next(false);
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