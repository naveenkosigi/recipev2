import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { ingredient } from "../MODELS/ingredient.model";

@Injectable({providedIn:'root'})

export class shoppingListService implements OnInit{
    public ingredients:ingredient[];
    triggerChange:Subject<any>=new Subject<any>();
    editIngredient:Subject<number>=new Subject<number>();
    public storeObservable:Observable<{ingredients:ingredient[]}>

    constructor(private store:Store<{shoppingList:{ingredients:ingredient[]}}>){
        this.storeObservable=this.store.select('shoppingList');
    }

    ngOnInit(){
        this.storeObservable=this.store.select('shoppingList');
    }

    
    addIngredient(ingredient:ingredient){
        this.ingredients.push(ingredient);
        this.triggerChange.next();
    }
    

    getIngredients(byReference:boolean | void){
        if(byReference === true){
            return this.ingredients;
        }
        return this.ingredients;
    }
    
}