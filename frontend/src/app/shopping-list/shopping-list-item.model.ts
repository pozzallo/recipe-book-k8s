
export class ShoppingListItem{

    // public id: number;

    constructor(public id: number, public name: string, public amount: number, public recipeName?: string){}

    public toString = () : string => {
        return `Item ${this.name} (id: ${this.id})`;
    }
}