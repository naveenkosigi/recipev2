import { Pipe, PipeTransform } from "@angular/core";
import { recipe } from "../MODELS/recipe.model";

@Pipe({
    name:'searchRecipes'
})
export class searchRecipes implements PipeTransform{
    transform(recipes: recipe[], searchString:string) {
        if(recipe.length == 0 || !searchString){
            return recipes;
        }
        else{
            const toReturn=[];
            for(let recipe of recipes){
                if(recipe.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1){
                    toReturn.push(recipe);
                }
            }
            return toReturn;
        }
    }
}