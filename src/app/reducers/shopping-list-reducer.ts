import { Action, ActionReducer } from "@ngrx/store";
import { addShoppingList, addToShoppingList, deleteShoppingList, startEditingList, stopEditingList, updateShoppingList } from "../ActionDispatchers/shopping-list-actionDispatcher";
import { ingredient } from "../MODELS/ingredient.model";

export interface shoppingListState{
    shoppingList:state
}

export interface state{
    ingredients:ingredient[],
    editedIngredient:ingredient,
    editedIngredientIndex:number
}

const initialState : state={
    ingredients:[
        new ingredient('apple',5),
        new ingredient('tomato',10)
    ],
    editedIngredient:undefined,
    editedIngredientIndex:-1
}

export function shoppingListReducer(state : state = initialState,action:addShoppingList | addToShoppingList | updateShoppingList | deleteShoppingList | startEditingList | stopEditingList ) : state{
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
        case "START_EDIT":{
            return{
                ...state,
                editedIngredient:{...state.ingredients[action.payload.index]},
                editedIngredientIndex:action.payload.index
            }
        }
        case "STOP_EDIT":{
            return{
                ...state,
                editedIngredient:undefined,
                editedIngredientIndex:-1
            }
        }    
        default:
            return state;    
    }
}