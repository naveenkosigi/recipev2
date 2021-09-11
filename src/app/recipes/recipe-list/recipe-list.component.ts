import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { recipeListService } from 'src/app/services/recipe-list.service';
import {recipe} from '../../MODELS/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:recipe[]=[];
  constructor(private recipeListService:recipeListService) { 
    this.recipes=this.recipeListService.getRecipes();
  }

  ngOnInit(): void {
  }

  clickedRecipe(event : any):void{
    this.recipeListService.selectedRecipe.emit(event);
  }

}
