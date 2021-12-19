import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { authReducer, authState } from "../reducers/authentication-reducer";
import { shoppingListReducer,state } from "../reducers/shopping-list-reducer";

export interface appState{
    shoppingList:state,
    authState:authState
}

export const appReducerMap : ActionReducerMap<appState> = {
    shoppingList:shoppingListReducer,
    authState:authReducer
}