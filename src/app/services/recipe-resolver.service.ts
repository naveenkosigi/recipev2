import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { recipe } from "../MODELS/recipe.model";
import { recipeListService } from "./recipe-list.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { authenticateService } from "./authentication.service";

@Injectable({
    providedIn:'root'
})
export class recipeResolver implements Resolve<object>{
    constructor(private recipeService:recipeListService,private httpClient:HttpClient,private authService:authenticateService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<object>{
        return this.httpClient.get('https://recipev2-bcd02-default-rtdb.firebaseio.com/recipes/' + route.params["id"] + ".json",{params : new HttpParams().set("auth",this.authService.sessionDetails.idToken)})
    }
}