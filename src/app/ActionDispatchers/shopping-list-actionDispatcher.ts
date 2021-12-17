import { Action } from "@ngrx/store";
import { ingredient } from "../MODELS/ingredient.model";

export class addShoppingList implements Action{
    readonly type="ADD";
    
    constructor(public payload:ingredient){

    }
}

export class addToShoppingList implements Action{
    readonly type="ADD_MULTIPLE";

    constructor(public payload:ingredient[]){

    }
}

export class updateShoppingList implements Action{
    readonly type="UPDATE";

    constructor(public payload:{ingredient:ingredient,index:number}){

    }
}

export class deleteShoppingList implements Action{
    readonly type="DELETE";
    
    constructor(public payload:{index:number}){

    }
}

export class startEditingList implements Action{
    readonly type="START_EDIT";

    constructor(public payload:{index:number}){

    }
}

export class stopEditingList implements Action{
    readonly type="STOP_EDIT";

}