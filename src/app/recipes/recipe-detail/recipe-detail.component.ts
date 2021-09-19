import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { recipe } from 'src/app/MODELS/recipe.model';
import { recipeListService } from 'src/app/services/recipe-list.service';
import { shoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:recipe;
  constructor(private shoppingListService:shoppingListService,private route:ActivatedRoute,private recipeService:recipeListService,private router:Router) { }

  ngOnInit(): void {
    this.route.data.subscribe((data:Data) => {
      this.recipe=data['recipe'];
      if(this.recipe === undefined){
        this.router.navigateByUrl("/recipes");
      }
    });
  }

  sendToShoppingList():void{
    for(let ingredient of this.recipe.ingredients){
      this.shoppingListService.addIngredient(ingredient);
    }
  }

}
