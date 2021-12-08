import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { addShoppingList } from "../ActionDispatchers/shopping-list-actionDispatcher";
import { ingredient } from "../MODELS/ingredient.model";
import { shoppingListState } from "../reducers/shopping-list-reducer";

@Injectable({providedIn:'root'})

export class shoppingListService{
    public ingredients:ingredient[];
    triggerChange:Subject<any>=new Subject<any>();
    editIngredient:Subject<number>=new Subject<number>();
    public storeObservable:Observable<shoppingListState>

    constructor(private store:Store<{shoppingList:shoppingListState}>){
        this.storeObservable=this.store.select('shoppingList');
    }
 
    addIngredient(ingredient:ingredient){
        this.store.dispatch(new addShoppingList(ingredient));
    }
    

    getIngredients(byReference:boolean | void){
        if(byReference === true){
            return this.ingredients;
        }
        return this.ingredients;
    }
    
}