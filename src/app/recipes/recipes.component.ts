import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { recipe } from '../MODELS/recipe.model';
import { recipeListService } from '../services/recipe-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe:recipe;
  constructor(private recipeListService:recipeListService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    if(!this.selectedRecipe && this.route.snapshot.params['id']){
      this.selectedRecipe=this.recipeListService.getRecipeById(this.route.snapshot.params['id']);
      if(this.selectedRecipe === undefined){
        this.router.navigate(["/recipes"]);
      }
    }

    this.route.data.subscribe((data:Data) => {
      this.selectedRecipe=data['recipe'];
    });
  }

}
