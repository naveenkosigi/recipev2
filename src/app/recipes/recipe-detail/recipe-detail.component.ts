import { Component, Input, OnInit } from '@angular/core';
import { recipe } from 'src/app/MODELS/recipe.model';
import { shoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe:recipe;
  constructor(private shoppingListService:shoppingListService) { }

  ngOnInit(): void {
  }

  sendToShoppingList():void{
    for(let ingredient of this.recipe.ingredients){
      this.shoppingListService.addIngredient(ingredient);
    }
  }

}
