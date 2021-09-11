import { EventEmitter, Injectable } from "@angular/core";
import { ingredient } from "../MODELS/ingredient.model";

@Injectable({providedIn:'root'})

export class shoppingListService{
    ingredients:ingredient[];
    triggerChange:EventEmitter<any>=new EventEmitter();

    constructor(){
        this.ingredients=[
            new ingredient('apple',5),
            new ingredient('tomato',10)
        ];
    }

    addIngredient(ingredient:ingredient){
        this.ingredients.push(ingredient);
        this.triggerChange.emit();
    }

    getIngredients(){
        return this.ingredients.slice();
    }
}