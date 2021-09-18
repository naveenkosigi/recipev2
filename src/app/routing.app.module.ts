import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";



const routes:Routes=[
    {path : 'recipes', component : RecipesComponent},
    {path: 'recipes/:id' , component: RecipesComponent},
  
    {path : 'shopping-list', component : ShoppingListComponent},
  
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