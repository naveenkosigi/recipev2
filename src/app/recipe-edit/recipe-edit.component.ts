import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { ingredient } from '../MODELS/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode:boolean=false;
  ngForm:FormGroup;
  constructor(private router:Router,private route:ActivatedRoute) { }

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

  addRecipe():void{
    console.log(this.ngForm);
  }

  addIngredient():void{
    (<FormArray>this.ngForm.get("ingredients")).push(new FormGroup({
      name:new FormControl(),
      amount:new FormControl()
    }));
  }

  get aliases() {
    return this.ngForm.get('ingredients') as FormArray;
  }

}
