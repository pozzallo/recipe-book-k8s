package com.variaS.recipebook.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.variaS.recipebook.entity.Recipe;

public interface RecipeService {

	public List<Recipe> getCommonRecipes();

	public Optional<Recipe> getRecipe(int id);
	
	public Recipe saveRecipe(Recipe recipe);

	void saveRecipes(List<Recipe> recipes);

	public Recipe updateRecipe(int id, Recipe recipe);

	public void deleteRecipe(int id);

	public void shareRecipe(int id);

	public void approveRecipe(Recipe recipe);
	
	
}
