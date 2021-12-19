import { Action } from "@ngrx/store";
import { sessionModel } from "../services/authentication.service";

export interface authState{
    sessionDetails:sessionModel
};

const initialAuthState:authState={
    sessionDetails:null
};

export function authReducer (state=initialAuthState,action){
    return state;
}