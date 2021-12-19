import { Action } from "@ngrx/store";
import { sessionModel } from "../services/authentication.service";

export class signUp implements Action{
    type="SIGNUP";

    constructor(public payload:{sessionDetails:sessionModel}){

    }
}

export class logIn implements Action{
    type="LOGIN";

    constructor(public payload:{sessionDetails:sessionModel}){
        
    }
}

export class logOut implements Action{
    type="LOGOUT";

    constructor(public payload:{sessionDetails:sessionModel}){
        
    }
}