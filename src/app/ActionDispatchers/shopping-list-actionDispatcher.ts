import { Action } from "@ngrx/store";
import { ingredient } from "../MODELS/ingredient.model";

export class addShoppingList implements Action{
    readonly type="ADD";
    
    constructor(public payload:ingredient){

    }
}