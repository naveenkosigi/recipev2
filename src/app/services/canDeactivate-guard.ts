import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";


export interface canDeactiveInterface{
    canDeactivate():boolean;
}

@Injectable({
    providedIn:'root'
})
export class canDeactiveServiceGuard implements CanDeactivate<canDeactiveInterface> {
    canDeactivate(component : canDeactiveInterface,currentRoute:ActivatedRouteSnapshot,currentState:RouterStateSnapshot) : boolean{
        return component.canDeactivate();
    }
}