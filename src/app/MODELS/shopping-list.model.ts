import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ShoppingEditComponent } from "../shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "../shopping-list/shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent    
    ],
    imports:[
        CommonModule,
        FormsModule
    ]
})
export class shoppingListModule{}