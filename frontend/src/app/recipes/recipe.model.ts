import { Ingredient } from "../shared/ingredient.model";
import { User } from "../user.model";

export class Recipe{
    public id: string;
    public name: string;
    public description: string;
    public imageUrl: string;
    public ingredients: Ingredient[];
    public user?: User;
    public pendingToApprove: boolean;

    constructor(id: string, name: string, imageUrl: string, description: string, ingredients: Ingredient[], userId:User){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.user = userId;
    }
}