import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ingredient } from 'src/app/MODELS/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() sendIngredient=new EventEmitter<ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  addRecipe(name:HTMLInputElement,amount:HTMLInputElement):void{
    this.sendIngredient.emit(new ingredient(name.value,+amount.value));
  }

}
