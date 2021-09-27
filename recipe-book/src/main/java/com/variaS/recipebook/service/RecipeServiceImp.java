package com.variaS.recipebook.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.variaS.recipebook.dao.IngredientRepository;
import com.variaS.recipebook.dao.RecipeRepository;
import com.variaS.recipebook.entity.Ingredient;
import com.variaS.recipebook.entity.Recipe;

@Service
public class RecipeServiceImp implements RecipeService{
	@Autowired 
	private RecipeRepository recipeRepository;
	
	@Autowired 
	private IngredientRepository ingredientRepository;

	@Override
	public List<Recipe> getCommonRecipes() {
		Integer id = null;
		List<Recipe> recipes = recipeRepository.findByUserId(id);
		return recipes;
	}
	
	@Override
	public Optional<Recipe> getRecipe(int id) {
		Optional<Recipe> optRecipe = recipeRepository.findById(id);
		return optRecipe;
	}

	@Override
	@Transactional
	public Recipe saveRecipe(Recipe recipe) {
		List<Ingredient> ingredients = recipe.getIngredients();
		ingredients.forEach(ingr -> ingr.setRecipe(recipe));
		return recipeRepository.save(recipe);
	}

	@Override
	@Transactional
	public void saveRecipes(List<Recipe> recipes) {
		recipeRepository.saveAll(recipes);	
	}

	@Override
	@Transactional
	public Recipe updateRecipe(int id, Recipe newRecipe) {
		Recipe recipe = recipeRepository.getOne(id);
		recipe.setDescription(newRecipe.getDescription());
		recipe.setName(newRecipe.getName());
		recipe.setImageUrl(newRecipe.getImageUrl());
		
		List<Ingredient> ingredients = ingredientRepository.findByRecipeId(id);
		ingredientRepository.deleteAll(ingredients);
		
		newRecipe.getIngredients().forEach(ingredient -> recipe.add(ingredient));
		
		return recipeRepository.save(recipe);
		
	}

	@Override
	public void deleteRecipe(int id) {
		recipeRepository.deleteById(id);
	}

	@Override
	@Transactional
	public void shareRecipe(int id) {
		Recipe sharedRecipe = recipeRepository.findById(id).get();
		// copy from user recipe to common recipe, set user = null and mark as pending to approve
		Recipe tempRecipe = new Recipe(null, 
				  sharedRecipe.getName(),
				  sharedRecipe.getImageUrl(),
				  sharedRecipe.getDescription(),
				  null,
				  null);
		tempRecipe.setPendingToApprove(true);
		Recipe newRecipe = recipeRepository.save(tempRecipe);
		List<Ingredient> ingredients = new ArrayList<Ingredient>();
		
		sharedRecipe.getIngredients().forEach(ingredient -> {
			ingredients.add(new Ingredient(null, ingredient.getName() ,ingredient.getAmount(), newRecipe));
		});
		newRecipe.setIngredients(ingredients);
		recipeRepository.save(newRecipe);
	}

	@Override
	public void approveRecipe(Recipe recipe) {
		recipe.setPendingToApprove(false);
		recipeRepository.save(recipe);
	}
	
	


}
