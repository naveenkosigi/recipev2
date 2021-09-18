import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { authService } from "./auth.service";


@Injectable({
    providedIn:'root'
})

export class authGuard implements CanActivate{
    constructor(private authService:authService){

    }

    canActivate(activatedRoute:ActivatedRouteSnapshot,routerStateSnapshot:RouterStateSnapshot):Promise<boolean>{
        return this.authService.authenticate();
    }
}