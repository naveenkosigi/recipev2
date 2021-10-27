import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { authGuard } from "./services/auth-guard.service";
import { canDeactiveServiceGuard } from "./services/canDeactivate-guard";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDummyContentComponent } from './recipe-dummy-content/recipe-dummy-content.component';
import { AuthenticateComponent } from "./authenticate/authenticate.component";



const routes:Routes=[
    {path : 'shopping-list', component : ShoppingListComponent, canActivate:[authGuard], canDeactivate:[canDeactiveServiceGuard]},
    {path : 'authenticate',component : AuthenticateComponent},
    {path : 'recipes', loadChildren : () => import('./modules/recipes-module').then(module => {
      console.log(module);
      return module.recipeModule;
    })}

  ];

 @NgModule({
     imports:[
         RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})
     ],
     exports:[RouterModule],
     declarations: [
       RecipeDummyContentComponent
     ]
 })
 
 export class routingAppModule{

 }