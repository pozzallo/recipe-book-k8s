package com.variaS.recipebook.service;

import java.util.List;
import java.util.Optional;

import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;

public interface RecipeService {

	public List<Recipe> getCommonRecipes();

	public Optional<Recipe> getRecipe(int id);
	
	public Recipe saveRecipe(Recipe recipe);

	public void saveRecipes(List<Recipe> recipes);

	public Recipe updateRecipe(int id, Recipe recipe);

	public void deleteRecipe(int id);

	public void shareRecipe(int id);

	public void approveRecipe(Recipe recipe);
	
	public List<Recipe> getUserRecipes(User user);
	
	
}
