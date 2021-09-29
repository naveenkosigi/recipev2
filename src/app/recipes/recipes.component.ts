import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { recipe } from '../MODELS/recipe.model';
import { recipeListService } from '../services/recipe-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[recipeListService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe:recipe;
  constructor(private recipeListService:recipeListService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

}
