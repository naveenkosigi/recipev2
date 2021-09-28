import { ingredient } from "./ingredient.model";

export class recipe{
    public name:string;
    public description:string;
    public url:string;
    public ingredients:ingredient[];
    public id:string;


    constructor(id:string,name:string,description:string,url:string,ingredients:ingredient[]){
        this.id=id;
        this.name=name;
        this.description=description;
        this.url=url;
        this.ingredients=ingredients;
    }
}