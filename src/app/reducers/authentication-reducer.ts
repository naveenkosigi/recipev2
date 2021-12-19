import { Action } from "@ngrx/store";
import { signUp } from "../ActionDispatchers/authentication-actionDispatcher";
import { sessionModel } from "../services/authentication.service";

export interface authState{
    sessionDetails:sessionModel
};

const initialAuthState:authState={
    sessionDetails:null
};

export function authReducer (state=initialAuthState,action : signUp) : authState{
    switch(action.type){
        case "SIGNUP":
            return{
                ...state,
                sessionDetails:action.payload.sessionDetails
            }
        case "LOGIN":
            return{
                ...state,
                sessionDetails : action.payload.sessionDetails
            }
        case "LOGOUT":
            return{
                ...state,
                sessionDetails:null
            }        
    }
    return state;
}