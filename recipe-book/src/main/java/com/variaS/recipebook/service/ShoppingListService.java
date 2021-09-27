package com.variaS.recipebook.service;

import java.util.List;

import com.variaS.recipebook.entity.ShoppingListItem;

public interface ShoppingListService {

	List<ShoppingListItem> getItems();
	
	List<ShoppingListItem> saveItems(List<ShoppingListItem> items);

	ShoppingListItem saveItem(ShoppingListItem item);

	void deleteItem(int id);

	ShoppingListItem updateItem(int id, ShoppingListItem item);
	
	public void deleteAllItems();
	
	public void deleteItems(List<ShoppingListItem> items);

	void deleteItemsByRecipeName(String recipeName);

}
