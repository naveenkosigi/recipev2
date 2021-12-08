import { Action } from "@ngrx/store";
import { addShoppingList, addToShoppingList, deleteShoppingList, updateShoppingList } from "../ActionDispatchers/shopping-list-actionDispatcher";
import { ingredient } from "../MODELS/ingredient.model";

const initialState={
    ingredients:[
        new ingredient('apple',5),
        new ingredient('tomato',10)
    ]
}

export function shoppingListReducer(state = initialState,action:addShoppingList | addToShoppingList | updateShoppingList | deleteShoppingList){
    switch(action.type){
        case "ADD":
            return{
                ...state,
                ingredients:[...state.ingredients,action.payload]
            }
        case "ADD_MULTIPLE":
            return{
                ...state,
                ingredients:[...state.ingredients,...action.payload]
            }
        case "UPDATE":
            const stateIngredient=state.ingredients[action.payload.index];
            const newIngredient={
                ...stateIngredient,
                ...action.payload.ingredient
            };

            const updatedIngredients=[...state.ingredients];
            updatedIngredients[action.payload.index]=newIngredient;
            
            return {
                ...state,
                ingredients:updatedIngredients
            }
        case "DELETE":
            return{
                ...state,
                ingredients:state.ingredients.filter((ing,index) => {
                    return index !== action.payload.index;
                })
            }
        default:
            return state;    
    }
}