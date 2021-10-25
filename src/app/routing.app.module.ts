import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { authGuard } from "./services/auth-guard.service";
import { canDeactiveServiceGuard } from "./services/canDeactivate-guard";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import {recipeResolver} from './services/recipe-resolver.service'
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDummyContentComponent } from './recipe-dummy-content/recipe-dummy-content.component';
import { AuthenticateComponent } from "./authenticate/authenticate.component";



const routes:Routes=[
    {path : 'shopping-list', component : ShoppingListComponent, canActivate:[authGuard], canDeactivate:[canDeactiveServiceGuard]},
    {path : 'authenticate',component : AuthenticateComponent}

  ];

 @NgModule({
     imports:[
         RouterModule.forRoot(routes)
     ],
     exports:[RouterModule],
     declarations: [
       RecipeDummyContentComponent
     ]
 })
 
 export class routingAppModule{

 }