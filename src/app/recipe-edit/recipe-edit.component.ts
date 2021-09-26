import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { ingredient } from '../MODELS/ingredient.model';
import { recipe } from '../MODELS/recipe.model';
import { recipeListService } from '../services/recipe-list.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,AfterContentInit {
  editMode:boolean=false;
  ngForm:FormGroup;
  constructor(private router:Router,private route:ActivatedRoute,private recipeListService:recipeListService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data:Data) => {
      if(data['recipe'] === undefined){
        this.editMode=false;
        this.router.navigateByUrl("/recipes/new");
      }
      else{
        this.editMode=true;
      }
      console.log(this.editMode);
    });

    this.ngForm=new FormGroup({
      recipeName:new FormControl('',Validators.required),
      imageUrl:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      ingredients:new FormArray([])
    });
  }

  ngAfterContentInit():void{
    if(this.editMode === false){
      this.addIngredient();
    }
  }

  addRecipe():void{
    let newRecipe=new recipe((this.recipeListService.getRecipes().length +1)+"",this.ngForm.value.recipeName,this.ngForm.value.description,this.ngForm.value.imageUrl,this.ngForm.value.ingredients);
    this.recipeListService.addNewRecipe(newRecipe);
    this.router.navigateByUrl("recipes/" + newRecipe.id);
  }

  addIngredient():void{
    (<FormArray>this.ngForm.get("ingredients")).push(new FormGroup({
      name:new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required)
    }));
  }

  get aliases() {
    return this.ngForm.get('ingredients') as FormArray;
  }

}
