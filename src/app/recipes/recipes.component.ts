import { Component, OnInit } from '@angular/core';
import { recipe } from '../MODELS/recipe.model';
import { recipeListService } from '../services/recipe-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe:recipe;
  constructor(private recipeListService:recipeListService) { }

  ngOnInit(): void {
    this.recipeListService.selectedRecipe.subscribe(
      (recipe:recipe) => {
        this.selectedRecipe=recipe;
      }
    );
  }


}
