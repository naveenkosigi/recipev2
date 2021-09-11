import { Component, OnInit } from '@angular/core';
import {ingredient} from '../MODELS/ingredient.model';
import { shoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:ingredient[]=[
    new ingredient('apple',5),
    new ingredient('tomato',10)
  ];
  constructor(private shoppingListService:shoppingListService) { }

  ngOnInit(): void {
    console.log(shoppingListService);
  }

  addIngredient(ingredient) : void{
    this.ingredients.push(ingredient);
  }

}
