import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';

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
      recipeName:new FormControl(),
      imageUrl:new FormControl()
    });
  }

  addRecipe():void{
    console.log(this.ngForm);
  }

}
