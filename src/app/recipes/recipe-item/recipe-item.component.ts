import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { recipe } from 'src/app/MODELS/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:recipe;
  @Output() selectedRecipe=new EventEmitter<recipe>();
  constructor() { }

  ngOnInit(): void {
  }

}
