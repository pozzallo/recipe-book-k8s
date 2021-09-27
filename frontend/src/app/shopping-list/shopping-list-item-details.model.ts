import { ShoppingListItem } from "./shopping-list-item.model";

export class ShoppingListItemDetails{
    name: string;
    items: ShoppingListItem[];

    constructor(name: string, items: ShoppingListItem[]){
        this.name = name;
        this.items = items;
    }

    calculateTotal(): number{
        let total = 0;
        for(let item of this.items){
            total += item.amount;
        }
        return total;
    }


}