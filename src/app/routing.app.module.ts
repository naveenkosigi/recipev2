import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { authGuard } from "./services/auth-guard.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";



const routes:Routes=[
    {path : 'recipes', component : RecipesComponent},
    {path: 'recipes/:id' , component: RecipesComponent},
  
    {path : 'shopping-list', component : ShoppingListComponent, canActivate:[authGuard]},
  
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