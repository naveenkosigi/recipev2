import { ingredient } from "./ingredient.model";

export class recipe{
    public name:string;
    public description:string;
    public url:string;
    public ingredients:ingredient[];

    constructor(name:string,description:string,url:string,ingredients:ingredient[]){
        this.name=name;
        this.description=description;
        this.url=url;
        this.ingredients=ingredients;
    }
}