import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { customDropdown } from "../custom-directives/dropdown-directive";
import { searchRecipes } from "../pipes/recipes.search.pipe";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "../recipes/recipe-item/recipe-item.component";
import { RecipeListComponent } from "../recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "../recipes/recipes.component";
import { recipesRoutingModule } from "./recipes-routing-module";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        customDropdown,
        RecipeEditComponent,
        searchRecipes
    ],
    imports:[
        RouterModule,ReactiveFormsModule,CommonModule,recipesRoutingModule,FormsModule
    ],
    exports:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent
    ]
})
export class recipeModule{}