import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Output,EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { updateShoppingList } from 'src/app/ActionDispatchers/shopping-list-actionDispatcher';
import { ingredient } from 'src/app/MODELS/ingredient.model';
import { shoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @Output() sendIngredient=new EventEmitter<ingredient>();
  @ViewChild("ngForm") ngForm:NgForm;
  subscription:Subscription;
  editIndex:number;
  editIngredint:ingredient;
  constructor(private shoppingListService:shoppingListService,private store:Store<{shoppingList:{ingredients:ingredient[]}}>) { }

  ngOnInit(): void {
    this.subscription=this.shoppingListService.editIngredient.subscribe((index:number) => {
      this.store.select('shoppingList').subscribe((ing : {ingredients:ingredient[]}) => {
        this.editIngredint={
          ...ing.ingredients[index]
        };
        this.editIndex=index;
        this.ngForm.form.patchValue({
          ingredient:this.editIngredint.name,
          amount:this.editIngredint.amount
        });
      })
    });
  }

  addRecipe():void{
    if(this.editIngredint !== undefined && this.editIndex !== undefined){
      let temp=new ingredient(this.ngForm.value.ingredient,this.ngForm.value.amount);
      this.store.dispatch(new updateShoppingList({ingredient:temp,index:this.editIndex}));
      this.editIndex=this.editIngredint=undefined;
      this.ngForm.resetForm();
    }
    else{
      this.shoppingListService.addIngredient(new ingredient(this.ngForm.value.ingredient,this.ngForm.value.amount));
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }  

  deleteRecipe():void{
    if(this.editIngredint !== undefined && this.editIndex !== undefined){
      let arrayRef=this.shoppingListService.getIngredients(true);
      arrayRef.splice(this.editIndex,1);
      this.shoppingListService.triggerChange.next();
      this.editIndex=this.editIngredint=undefined;
      this.ngForm.resetForm();
    }
    else{
      return;
    }
  }
}
