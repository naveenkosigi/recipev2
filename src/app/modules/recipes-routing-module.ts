import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RecipeDummyContentComponent } from "../recipe-dummy-content/recipe-dummy-content.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "../recipes/recipes.component";
import { recipeResolver } from "../services/recipe-resolver.service";



@NgModule({
    imports:[
        RouterModule.forChild([
            {path : 'recipes', component : RecipesComponent, children:[
                {path : '' , component:RecipeDummyContentComponent},
                {path : 'new',component:RecipeEditComponent},
                {path:':id/edit', component:RecipeEditComponent,pathMatch:'full', resolve:{recipe:recipeResolver}},
                {path: ':id' , component: RecipeDetailComponent ,pathMatch:"full", resolve:{recipe:recipeResolver}},
            ]}
        ])
    ],
    exports:[RouterModule]
})
export class recipesRoutingModule{}