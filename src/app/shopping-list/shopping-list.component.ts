import { Component, OnInit } from '@angular/core';
import {ingredient} from '../MODELS/ingredient.model';
import { canDeactiveInterface } from '../services/canDeactivate-guard';
import { shoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,canDeactiveInterface {
  ingredients:ingredient[]=[];
  constructor(private shoppingListService:shoppingListService) { 
    this.ingredients=this.shoppingListService.getIngredients();
    this.shoppingListService.triggerChange.subscribe(
      () => {
        this.ingredients=this.shoppingListService.getIngredients();
      }
    )
  }

  ngOnInit(): void {
    console.log(shoppingListService);
  }

  addIngredient(ingredient) : void{
    this.ingredients.push(ingredient);
  }

  canDeactivate():boolean{
    return confirm("Leaving this page abruptly may not save the changes");
  }

  editIngredient(index:number){
    this.shoppingListService.editIngredient.next(index);
  }

}
