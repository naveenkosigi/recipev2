import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { ingredient } from '../MODELS/ingredient.model';
import { recipe } from '../MODELS/recipe.model';
import { recipeListService } from '../services/recipe-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,AfterContentInit {
  editMode:boolean=false;
  ngForm:FormGroup;
  editIndex:number=-1;
  selectedRecipe:recipe;

  constructor(private router:Router,private route:ActivatedRoute,private recipeListService:recipeListService,private httpClient:HttpClient) { }

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
        this.selectedRecipe=recipe;
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
    if(!this.ngForm.valid){
      return;
    }
    let sendData ={
      name:this.ngForm.value.recipeName,
      description:this.ngForm.value.description,
      url:this.ngForm.value.imageUrl,
      ingredients:this.ngForm.value.ingredients
    };

    let newRecipe:recipe;
    if(this.editMode === true){
      this.httpClient.put('https://recipev2-bcd02-default-rtdb.firebaseio.com/recipes/' + this.selectedRecipe.id + ".json",sendData)
      .subscribe((data) => {
        newRecipe=new recipe(this.selectedRecipe.id,this.ngForm.value.recipeName,this.ngForm.value.description,this.ngForm.value.imageUrl,this.ngForm.value.ingredients);
        this.recipeListService.replaceRecipeByIndex(this.editIndex,newRecipe);
        this.router.navigateByUrl("recipes/" + newRecipe.id);    
      });
    }
    else{
      this.httpClient.post('https://recipev2-bcd02-default-rtdb.firebaseio.com/recipes.json',sendData)
      .subscribe((data:any) => {
        console.log(data);
        newRecipe=new recipe(data.name,this.ngForm.value.recipeName,this.ngForm.value.description,this.ngForm.value.imageUrl,this.ngForm.value.ingredients);
        this.recipeListService.addNewRecipe(newRecipe);
        this.router.navigateByUrl("recipes/" + newRecipe.id);  
      });
    }
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

  cancel():void{
    this.router.navigate(["../"],{relativeTo:this.route})
  }
}
