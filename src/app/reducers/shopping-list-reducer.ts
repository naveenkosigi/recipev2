import { Action } from "@ngrx/store";
import { addShoppingList } from "../ActionDispatchers/shopping-list-actionDispatcher";
import { ingredient } from "../MODELS/ingredient.model";

const initialState={
    ingredients:[
        new ingredient('apple',5),
        new ingredient('tomato',10)
    ]
}

export function shoppingListReducer(state = initialState,action:addShoppingList){
    switch(action.type){
        case "ADD":
            return{
                ...state,
                ingredients:[...state.ingredients,action.payload]
            }
        default:
            return state;    
    }
}