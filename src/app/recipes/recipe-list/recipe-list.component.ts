import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipeListService } from 'src/app/services/recipe-list.service';
import {recipe} from '../../MODELS/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:recipe[]=[];
  subscription:Subscription;
  isLoading=true;
  subscriptionLoadingIndicator:Subscription;
  constructor(private recipeListService:recipeListService,private router:Router,private route:ActivatedRoute) { 
    this.recipes=this.recipeListService.getRecipes();
    this.subscriptionLoadingIndicator=this.recipeListService.isLoading.subscribe(() => {
      this.isLoading=false;
    });
  }

  ngOnInit(): void {

    this.subscription=this.recipeListService.triggerChange.subscribe(() =>{
      this.recipes=this.recipeListService.getRecipes();
    })
  }

  clickedRecipe(event : any):void{
    this.recipeListService.selectedRecipe.emit(event);
  }

  newRecipe():void{
    this.router.navigate(["new"],{relativeTo:this.route});
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
    this.subscriptionLoadingIndicator.unsubscribe();
  }

}
