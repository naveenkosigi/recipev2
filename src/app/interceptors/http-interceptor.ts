import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class customHttpInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("interceptor 1");
        req=req.clone({
            headers:req.headers.append("auth","abc")
        });
        return next.handle(req).pipe(tap(event => {
            console.log(" tap 1");
        }));
    }
}