package com.variaS.recipebook.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.variaS.recipebook.dao.ShoppingListItemRepository;
import com.variaS.recipebook.entity.ShoppingListItem;

@Service
public class ShoppingListServiceImpl implements ShoppingListService{
	
	@Autowired
	private ShoppingListItemRepository shoppingListItemRepository;

	@Override
	public List<ShoppingListItem> getItems() {
		List<ShoppingListItem> items = shoppingListItemRepository.findAll();
		return items;
	}

	@Override
	@Transactional
	public List<ShoppingListItem> saveItems(List<ShoppingListItem> items) {
		List<ShoppingListItem> savedItems = shoppingListItemRepository.saveAll(items);
		return savedItems;
	}

	@Override
	@Transactional
	public ShoppingListItem saveItem(ShoppingListItem item) {
		ShoppingListItem savedItem = shoppingListItemRepository.save(item);
		return savedItem;
	}

	@Override
	public void deleteItem(int id) {
		this.shoppingListItemRepository.deleteById(id);
	}

	@Override
	@Transactional
	public ShoppingListItem updateItem(int id, ShoppingListItem item) {
		ShoppingListItem updatedItem = null;
		Optional<ShoppingListItem> optionalItem = this.shoppingListItemRepository.findById(id);
		if(optionalItem.isPresent()) {
			updatedItem = optionalItem.get();
			updatedItem.setName(item.getName());
			updatedItem.setAmount(item.getAmount());
			updatedItem.setRecipeName(item.getRecipeName());
			updatedItem = this.shoppingListItemRepository.save(updatedItem);
		}
		return updatedItem;
	}

	@Override
	@Transactional
	public void deleteAllItems() {
		this.shoppingListItemRepository.deleteAll();
	}

	@Override
	public void deleteItems(List<ShoppingListItem> items) {
		this.shoppingListItemRepository.deleteAll(items);
	}

	@Override
	@Transactional
	public void deleteItemsByRecipeName(String recipeName) {
		List<ShoppingListItem> findByRecipeName = this.shoppingListItemRepository.findByRecipeName(recipeName);
		this.shoppingListItemRepository.deleteAll(findByRecipeName);
	}
	
}
