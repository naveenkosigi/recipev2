import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class dummyInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("interceptor 2");
        return next.handle(req).pipe(tap(function(){
            console.log(" tap 2");
        }));
    }
}