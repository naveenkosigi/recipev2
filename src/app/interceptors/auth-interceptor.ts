import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { authService } from "../services/auth.service";
import { authenticateService } from "../services/authentication.service";

@Injectable()
export class authInterceptor implements HttpInterceptor{
    constructor(private authService:authenticateService){

    }
    intercept(httpRequest:HttpRequest<any>,next:HttpHandler){
        let toReturn:HttpRequest<any>;
        console.log(httpRequest);
        if(!httpRequest.url.startsWith("https://identitytoolkit.googleapis.com/") && httpRequest.responseType !== "blob"){
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