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
  editIndex:number=-1;
  constructor(private router:Router,private route:ActivatedRoute,private recipeListService:recipeListService) { }

  ngOnInit(): void {
    this.ngForm=new FormGroup({
      recipeName:new FormControl('',Validators.required),
      imageUrl:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      ingredients:new FormArray([])
    });

    this.route.data.subscribe((data:Data) => {
      if(data['recipe'] === undefined){
        this.editMode=false;
        this.router.navigateByUrl("/recipes/new");
      }
      else{
        this.editMode=true;
        let recipe:recipe=data['recipe'];
        let ingredients:FormArray=new FormArray([]);
        for (let ingredient of recipe.ingredients){
          ingredients.push(new FormGroup({
            name:new FormControl(ingredient.name,Validators.required),
            amount:new FormControl(ingredient.amount,Validators.required)
          }));
        }
        this.ngForm=new FormGroup({
          recipeName:new FormControl(recipe.name,Validators.required),
          imageUrl:new FormControl(recipe.url,Validators.required),
          description:new FormControl(recipe.description,Validators.required),
          ingredients:ingredients
        });
        this.editIndex=+recipe.id;
      }
      console.log(this.editMode);
    });
  }

  ngAfterContentInit():void{
    if(this.editMode === false){
      this.addIngredient();
    }
  }

  addRecipe():void{
    let newRecipe:recipe;
    if(this.editMode === true){
      newRecipe=new recipe(this.editIndex + "",this.ngForm.value.recipeName,this.ngForm.value.description,this.ngForm.value.imageUrl,this.ngForm.value.ingredients);
      this.recipeListService.replaceRecipeByIndex(this.editIndex,newRecipe);
    }
    else{
      newRecipe=new recipe((this.recipeListService.getRecipes().length +1)+"",this.ngForm.value.recipeName,this.ngForm.value.description,this.ngForm.value.imageUrl,this.ngForm.value.ingredients);
      this.recipeListService.addNewRecipe(newRecipe);
    }
    this.router.navigateByUrl("recipes/" + newRecipe.id);  
  }

  addIngredient():void{
    (<FormArray>this.ngForm.get("ingredients")).push(new FormGroup({
      name:new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required)
    }));
  }

  removeCurrentIngredient(index:number):void{
    this.aliases.removeAt(index);
    if(this.aliases.length === 0){
      this.addIngredient();
    }
  }

  get aliases() : FormArray {
    return this.ngForm.get('ingredients') as FormArray;
  }

}
