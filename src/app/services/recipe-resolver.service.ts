import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { recipe } from "../MODELS/recipe.model";
import { recipeListService } from "./recipe-list.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class recipeResolver implements Resolve<object>{
    constructor(private recipeService:recipeListService,private httpClient:HttpClient){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<object>{
        return this.httpClient.get('https://recipev2-bcd02-default-rtdb.firebaseio.com/recipes/' + route.params["id"] + ".json")
    }
}