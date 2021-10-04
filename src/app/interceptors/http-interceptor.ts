import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class customHttpInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("Called Request");
        return next.handle(req);
    }
}