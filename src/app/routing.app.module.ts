import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { authGuard } from "./services/auth-guard.service";
import { canDeactiveServiceGuard } from "./services/canDeactivate-guard";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import {recipeResolver} from './services/recipe-resolver.service'



const routes:Routes=[
    {path : 'recipes', component : RecipesComponent},
    {path: 'recipes/:id' , component: RecipesComponent , resolve:{recipe:recipeResolver}},
  
    {path : 'shopping-list', component : ShoppingListComponent, canActivate:[authGuard], canDeactivate:[canDeactiveServiceGuard]},
  
    {path : '**' , redirectTo : 'recipes'}
  ];

 @NgModule({
     imports:[
         RouterModule.forRoot(routes)
     ],
     exports:[RouterModule]
 })
 
 export class routingAppModule{

 }