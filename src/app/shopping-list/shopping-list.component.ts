import { Component, OnInit } from '@angular/core';
import {ingredient} from '../MODELS/ingredient.model';

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
  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(ingredient) : void{
    this.ingredients.push(ingredient);
  }

}
