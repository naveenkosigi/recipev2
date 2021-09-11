import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ingredient } from 'src/app/MODELS/ingredient.model';
import { shoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() sendIngredient=new EventEmitter<ingredient>();
  
  constructor(private shoppingListService:shoppingListService) { }

  ngOnInit(): void {
  }

  addRecipe(name:HTMLInputElement,amount:HTMLInputElement):void{
    this.shoppingListService.addIngredient(new ingredient(name.value,+amount.value));
  }

}
