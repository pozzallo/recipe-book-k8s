package com.variaS.recipebook.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.variaS.recipebook.entity.ShoppingListItem;
import com.variaS.recipebook.service.ShoppingListService;

@CrossOrigin("http://localhost")
@RestController
@RequestMapping("api/shoppingList")
public class ShoppingListController {
	
	@Autowired
	private ShoppingListService shoppingListService;
	
	@GetMapping("/items")
	public ResponseEntity<Collection<ShoppingListItem>> getItems(){
		Collection<ShoppingListItem> items = new ArrayList<ShoppingListItem>();
		items.addAll(this.shoppingListService.getItems());
		if (items.isEmpty()){
			return new ResponseEntity<Collection<ShoppingListItem>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Collection<ShoppingListItem>>(items, HttpStatus.OK);
	}
	
	@PostMapping("/items")
	public ResponseEntity<List<ShoppingListItem>> saveItems(@RequestBody ShoppingListItem[] items){
		List<ShoppingListItem> savedItems = shoppingListService.saveItems(Arrays.asList(items));
		return new ResponseEntity<List<ShoppingListItem>>(savedItems, HttpStatus.CREATED);
	}
	
	@PostMapping("/items/item")
	public ResponseEntity<ShoppingListItem> saveItem(@RequestBody ShoppingListItem item){
		ShoppingListItem savedItem = shoppingListService.saveItem(item);
		return new ResponseEntity<ShoppingListItem>(savedItem, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/items/{id}")
	public void deleteShoppingListItem(@PathVariable("id") int id) {
		this.shoppingListService.deleteItem(id);
	}
	
	@PutMapping("/items/{id}")
	public ResponseEntity<ShoppingListItem> updateItem(@PathVariable("id") int id, @RequestBody ShoppingListItem item){
		ShoppingListItem updatedItem = shoppingListService.updateItem(id, item);
		if(updatedItem == null) {
			return new ResponseEntity<ShoppingListItem>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<ShoppingListItem>(updatedItem, HttpStatus.OK);
	}
	
	@DeleteMapping("/items/all")
	public void deleteAllItems() {
		this.shoppingListService.deleteAllItems();
	}
	
	@DeleteMapping("/items/recipes/{recipeName}")
	public void deleteItems(@PathVariable("recipeName") String recipeName) {
		this.shoppingListService.deleteItemsByRecipeName(recipeName);
	}
	

}
