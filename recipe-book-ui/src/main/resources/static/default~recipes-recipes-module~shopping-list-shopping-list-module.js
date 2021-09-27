(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~recipes-recipes-module~shopping-list-shopping-list-module"],{

/***/ "EGeE":
/*!***********************************************************!*\
  !*** ./src/app/shopping-list/shopping-list-item.model.ts ***!
  \***********************************************************/
/*! exports provided: ShoppingListItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingListItem", function() { return ShoppingListItem; });
class ShoppingListItem {
    // public id: number;
    constructor(id, name, amount, recipeName) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.recipeName = recipeName;
        this.toString = () => {
            return `Item ${this.name} (id: ${this.id})`;
        };
    }
}


/***/ }),

/***/ "PwLB":
/*!*************************************************************!*\
  !*** ./src/app/shopping-list/shopping-list-item.service.ts ***!
  \*************************************************************/
/*! exports provided: ShoppingListItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingListItemService", function() { return ShoppingListItemService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shopping_list_item_details_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shopping-list-item-details.model */ "ldv+");
/* harmony import */ var _shopping_list_item_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shopping-list-item.model */ "EGeE");
/* harmony import */ var _shopping_list_rest_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shopping-list-rest.service */ "yqTv");
/* harmony import */ var _recipes_recipe_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../recipes/recipe.service */ "ceC1");








class ShoppingListItemService {
    constructor(restService, recipeService) {
        this.restService = restService;
        this.recipeService = recipeService;
        this.shoppingListItems = [];
        this.itemChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.selectedItem = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    // getShoppingListItems(){
    //   this.restService.getShoppingListItems().subscribe(
    //     items => {
    //       console.log('response: ' + items);
    //       this.shoppingListItems = items;
    //       this.itemChanged.next(this.shoppingListItems.slice());
    //       console.log('itemChanged ' + this.shoppingListItems.slice())
    //     }
    //   );
    //   return this.shoppingListItems.slice();
    // }
    getShoppingListItems() {
        return this.restService.getShoppingListItems().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(resp => this.shoppingListItems = resp));
    }
    deleteAllItems() {
        this.restService.deleteAllShoppingListItems().subscribe(resp => {
            this.shoppingListItems = [];
            this.itemChanged.next(this.shoppingListItems.slice());
        });
    }
    addItems(items) {
        this.restService.saveShoppingListItems(items).subscribe(items => {
            this.shoppingListItems.push(...items);
            this.itemChanged.next(this.shoppingListItems.slice());
        });
    }
    deleteItemsByRecipeName(recipeName) {
        this.restService.deleteShoppingListItemsByRecipeName(recipeName).subscribe(resp => {
            this.shoppingListItems = this.shoppingListItems.filter(item => item.recipeName != recipeName);
            this.itemChanged.next(this.shoppingListItems.slice());
        });
    }
    updateShoppingListItem(id, item) {
        this.restService.updateShoppingListitem(id, item).subscribe(updatedItem => {
            console.log("updated Item: " + JSON.stringify(updatedItem));
            let index = this.shoppingListItems.findIndex(item => item.id == id);
            console.log('update index: ' + index);
            this.shoppingListItems[index] = item;
            this.itemChanged.next(this.shoppingListItems.slice());
        });
    }
    addShoppingListItem(item) {
        this.restService.addShoppingListitem(item).subscribe(savedItem => {
            this.shoppingListItems.push(savedItem);
            this.itemChanged.next(this.shoppingListItems.slice());
        });
    }
    deleteShoppingListItem(id) {
        this.restService.deleteShoppingListItem(id).subscribe(resp => {
            let index = this.shoppingListItems.findIndex(item => item.id == id);
            const deletedItem = this.shoppingListItems[index];
            this.shoppingListItems.splice(index, 1);
            this.itemChanged.next(this.shoppingListItems.slice());
        });
    }
    groupBy(key, array) {
        return array.reduce((acc, obj) => {
            const property = obj[key];
            acc[property] = acc[property] || [];
            acc[property].push(obj);
            return acc;
        }, {});
    }
    groupShoppingListItem(key, array) {
        let sortedItems = [];
        let sortedItemsRow = this.groupBy(key, array);
        for (let prop in sortedItemsRow) {
            sortedItems.push(new _shopping_list_item_details_model__WEBPACK_IMPORTED_MODULE_3__["ShoppingListItemDetails"](prop, sortedItemsRow[prop]));
        }
        return sortedItems;
    }
    convertIngredientsToShoppingListItems(ingredients, recipeName) {
        let shoppingListItems = [];
        let tempRecipeName = recipeName ? recipeName : null;
        shoppingListItems = ingredients.map(ingredient => {
            return new _shopping_list_item_model__WEBPACK_IMPORTED_MODULE_4__["ShoppingListItem"](null, ingredient.name, ingredient.amount, tempRecipeName);
        });
        return shoppingListItems;
    }
}
ShoppingListItemService.ɵfac = function ShoppingListItemService_Factory(t) { return new (t || ShoppingListItemService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_shopping_list_rest_service__WEBPACK_IMPORTED_MODULE_5__["ShoppingListRestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_recipes_recipe_service__WEBPACK_IMPORTED_MODULE_6__["RecipeService"])); };
ShoppingListItemService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ShoppingListItemService, factory: ShoppingListItemService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShoppingListItemService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _shopping_list_rest_service__WEBPACK_IMPORTED_MODULE_5__["ShoppingListRestService"] }, { type: _recipes_recipe_service__WEBPACK_IMPORTED_MODULE_6__["RecipeService"] }]; }, null); })();


/***/ }),

/***/ "aVO8":
/*!************************************************!*\
  !*** ./src/app/recipes/recipe-rest.service.ts ***!
  \************************************************/
/*! exports provided: RecipeRestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecipeRestService", function() { return RecipeRestService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class RecipeRestService {
    // baseUrl = 'http://localhost:8080/api/recipes';
    constructor(http) {
        this.http = http;
        this.baseUrl = 'api/recipes';
    }
    getRecipes() {
        return this.http.get(this.baseUrl);
    }
    saveRecipe(recipe) {
        return this.http.post(this.baseUrl, recipe);
    }
    updateRecipe(id, recipe) {
        return this.http.put(`${this.baseUrl}/${id}`, recipe);
    }
    getRecipe(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    deleteRecipe(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
RecipeRestService.ɵfac = function RecipeRestService_Factory(t) { return new (t || RecipeRestService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
RecipeRestService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RecipeRestService, factory: RecipeRestService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RecipeRestService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "ceC1":
/*!*******************************************!*\
  !*** ./src/app/recipes/recipe.service.ts ***!
  \*******************************************/
/*! exports provided: RecipeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecipeService", function() { return RecipeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _recipe_rest_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recipe-rest.service */ "aVO8");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");






class RecipeService {
    constructor(recipeRestService, http) {
        this.recipeRestService = recipeRestService;
        this.http = http;
        this.recipesChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.recipes = [];
        this.recipeChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    setRecipes(recipes) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes() {
        return this.recipeRestService.getRecipes().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(resp => this.recipes = resp));
    }
    getRecipe(id) {
        return this.recipeRestService.getRecipe(id);
    }
    addRecipe(recipe) {
        this.recipeRestService.saveRecipe(recipe).subscribe((resp) => {
            this.recipes.push(resp);
            this.recipesChanged.next(this.recipes.slice());
        });
    }
    updateRecipe(recipeId, recipe) {
        this.recipeRestService.updateRecipe(recipeId, recipe).subscribe(respRecipe => {
            let index = this.recipes.findIndex(item => item.id == recipeId);
            this.recipes[index] = respRecipe;
            this.recipesChanged.next(this.recipes.slice());
            this.recipeChanged.next(respRecipe);
        });
    }
    deleteRecipe(id) {
        this.recipeRestService.deleteRecipe(id).subscribe(resp => {
            let index = this.recipes.findIndex(item => item.id == id);
            this.recipes.splice(index, 1);
            this.recipesChanged.next(this.recipes.slice());
        });
    }
    addToMyRecipes(recipe) {
        return this.http.post(`api/user/recipes`, recipe);
    }
    shareRecipe(id) {
        return this.http.get(`api/recipes/${id}/share`);
    }
    approveRecipe(recipe) {
        return this.http.post(`api/recipes/approve`, recipe);
    }
}
RecipeService.ɵfac = function RecipeService_Factory(t) { return new (t || RecipeService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_recipe_rest_service__WEBPACK_IMPORTED_MODULE_3__["RecipeRestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); };
RecipeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RecipeService, factory: RecipeService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RecipeService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _recipe_rest_service__WEBPACK_IMPORTED_MODULE_3__["RecipeRestService"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "ldv+":
/*!*******************************************************************!*\
  !*** ./src/app/shopping-list/shopping-list-item-details.model.ts ***!
  \*******************************************************************/
/*! exports provided: ShoppingListItemDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingListItemDetails", function() { return ShoppingListItemDetails; });
class ShoppingListItemDetails {
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }
    calculateTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.amount;
        }
        return total;
    }
}


/***/ }),

/***/ "yqTv":
/*!*************************************************************!*\
  !*** ./src/app/shopping-list/shopping-list-rest.service.ts ***!
  \*************************************************************/
/*! exports provided: ShoppingListRestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingListRestService", function() { return ShoppingListRestService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class ShoppingListRestService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'api/shoppingList';
    }
    getShoppingListItems() {
        return this.http.get(`${this.baseUrl}/items`);
    }
    saveShoppingListItems(items) {
        return this.http.post(`${this.baseUrl}/items`, items);
    }
    updateShoppingListitem(id, item) {
        return this.http.put(`${this.baseUrl}/items/${id}`, item);
    }
    addShoppingListitem(item) {
        return this.http.post(`${this.baseUrl}/items/item`, item);
    }
    deleteShoppingListItem(id) {
        return this.http.delete(`${this.baseUrl}/items/${id}`);
    }
    deleteAllShoppingListItems() {
        return this.http.delete(`${this.baseUrl}/items/all`);
    }
    deleteShoppingListItemsByRecipeName(recipeName) {
        return this.http.delete(`${this.baseUrl}/items/recipes/${recipeName}`);
    }
}
ShoppingListRestService.ɵfac = function ShoppingListRestService_Factory(t) { return new (t || ShoppingListRestService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
ShoppingListRestService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ShoppingListRestService, factory: ShoppingListRestService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShoppingListRestService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=default~recipes-recipes-module~shopping-list-shopping-list-module.js.map