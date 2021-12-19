import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { recipe } from 'src/app/MODELS/recipe.model';
import { recipeListService } from 'src/app/services/recipe-list.service';
import { shoppingListService } from 'src/app/services/shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ingredient } from 'src/app/MODELS/ingredient.model';
import { Observable } from 'rxjs';
import { addToShoppingList } from 'src/app/ActionDispatchers/shopping-list-actionDispatcher';
import { appState } from 'src/app/AppState/appState';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:recipe;
  storeObservable:Observable<{ingredients:ingredient[]}>
  constructor(private shoppingListService:shoppingListService,private route:ActivatedRoute,private recipeService:recipeListService,private router:Router,private httpClient:HttpClient,private store:Store<appState>) { }

  ngOnInit(): void {
    this.route.data.subscribe((data:Data) => {
      this.recipe=data['recipe'];
      if(!this.recipe){
        this.router.navigateByUrl("/recipes");
      }
      else{
        this.recipe.id=this.route.snapshot.params.id;
      }
    });
  }

  sendToShoppingList():void{
    this.store.dispatch(new addToShoppingList(this.recipe.ingredients));

    /*for(let ingredient of this.recipe.ingredients){
      this.shoppingListService.addIngredient(ingredient);
    }*/
  }

  deleteRecipe():void{
    this.httpClient.delete('https://recipev2-bcd02-default-rtdb.firebaseio.com/recipes/' + this.recipe.id + '.json')
    .subscribe((data) => {
      this.recipeService.removeRecipeById(this.recipe.id);
      this.router.navigate(["../"],{relativeTo:this.route});
    });
  }

}
