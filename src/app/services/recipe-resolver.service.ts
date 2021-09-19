import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { recipe } from "../MODELS/recipe.model";
import { recipeListService } from "./recipe-list.service";

@Injectable({
    providedIn:'root'
})
export class recipeResolver implements Resolve<recipe>{
    constructor(private recipeService:recipeListService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<recipe> | recipe{
        return this.recipeService.getRecipeById(route.params["id"]);
    }
}