import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../MODELS/ingredient.model";

@Injectable({providedIn:'root'})

export class shoppingListService{
    ingredients:ingredient[];
    triggerChange:Subject<any>=new Subject<any>();
    editIngredient:Subject<number>=new Subject<number>();

    constructor(){
        this.ingredients=[
            new ingredient('apple',5),
            new ingredient('tomato',10)
        ];
    }

    addIngredient(ingredient:ingredient){
        this.ingredients.push(ingredient);
        this.triggerChange.next();
    }

    getIngredients(byReference:boolean | void){
        if(byReference === true){
            return this.ingredients;
        }
        return this.ingredients.slice();
    }
}