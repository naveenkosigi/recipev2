import { Component, Input, OnInit } from '@angular/core';
import { recipe } from 'src/app/MODELS/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe:recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
