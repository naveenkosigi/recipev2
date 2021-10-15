import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { customHighlight } from './custom-directives/highlight-component';
import { customDropdown } from './custom-directives/dropdown-directive';
import { routingAppModule } from './routing.app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; 
import { customHttpInterceptor } from './interceptors/http-interceptor';
import { dummyInterceptor } from './interceptors/http-interceptor2';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { authInterceptor } from './interceptors/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    customHighlight,
    customDropdown,
    RecipeEditComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    routingAppModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:authInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }



