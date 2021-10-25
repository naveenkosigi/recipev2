import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "../recipes/recipe-item/recipe-item.component";
import { RecipeListComponent } from "../recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "../recipes/recipes.component";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent
    ],
    imports:[
        RouterModule,ReactiveFormsModule,CommonModule
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