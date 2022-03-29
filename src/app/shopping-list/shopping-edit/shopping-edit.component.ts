import { Component, OnInit, Output,EventEmitter, ViewChild, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteShoppingList, stopEditingList, updateShoppingList } from 'src/app/ActionDispatchers/shopping-list-actionDispatcher';
import { appState } from 'src/app/AppState/appState';
import { ingredient } from 'src/app/MODELS/ingredient.model';
import { state } from 'src/app/reducers/shopping-list-reducer';
import { shoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy,AfterViewInit {
  @Output() sendIngredient=new EventEmitter<ingredient>();
  @ViewChild("ngForm") ngForm:NgForm;
  subscription:Subscription;
  editIndex:number;
  editIngredint:ingredient;
  constructor(private shoppingListService:shoppingListService,private store:Store<appState>) { }

  ngOnInit(): void {

    
  }

  ngAfterViewInit(): void {
    this.subscription=this.store.select('shoppingList').subscribe((state:state) => {
      if(state.editedIngredientIndex > -1){
        console.log(state);
        this.editIngredint=state.editedIngredient;
        this.editIndex=state.editedIngredientIndex;
        this.ngForm.form.patchValue({
          ingredient:this.editIngredint.name,
          amount:this.editIngredint.amount
        });
      }
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
      this.editIndex=this.editIngredint=undefined;
      this.ngForm.resetForm();
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }  

  deleteRecipe():void{
    if(this.editIngredint !== undefined && this.editIndex !== undefined){
      this.store.dispatch(new deleteShoppingList({index:this.editIndex}));
      this.editIndex=this.editIngredint=undefined;
      this.ngForm.resetForm();
    }
    else{
      return;
    }
  }

  clear():void{
    this.store.dispatch(new stopEditingList());
    this.ngForm.form.reset();
  }
}
