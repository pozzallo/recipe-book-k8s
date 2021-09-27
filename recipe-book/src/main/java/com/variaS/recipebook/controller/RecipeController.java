package com.variaS.recipebook.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.variaS.recipebook.dao.RecipeRepository;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.RecipeService;
import com.variaS.recipebook.service.UserService;

@CrossOrigin("http://localhost")
@RestController
@RequestMapping("/api")
public class RecipeController {
	
	@Autowired
	RecipeService recipeService;
	
	@Autowired
	RecipeRepository recipeRep;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/recipes")
	public ResponseEntity<List<Recipe>> getRecipes(){
		// find recipes with no user
		List<Recipe> recipes = recipeService.getCommonRecipes();
		if(recipes == null) {
			return ResponseEntity.notFound().build();
		}
		User currentUser = userService.getCurrentUser();
		if(currentUser != null) {
			// find recipes of current user
			List<Recipe> userRecipes = recipeRep.findByUserId(currentUser.getId());
			recipes.addAll(userRecipes);
		}
		return ResponseEntity.ok(recipes);
	}
	
	@GetMapping("/recipes/{id}")
	public ResponseEntity<Recipe> getRecipe(@PathVariable("id") int id){
		Optional<Recipe> optRecipe = recipeService.getRecipe(id);
		return ResponseEntity.of(optRecipe);
	}
	
	@PostMapping("/recipes")
	public ResponseEntity<Recipe> saveRecipe(@RequestBody Recipe recipe){
		Recipe savedRecipe = recipeService.saveRecipe(recipe);
		return ResponseEntity.ok(savedRecipe);
	}
	
	@PutMapping("/recipes/{id}")
	public Recipe updateRecipe(@PathVariable("id") int id, @RequestBody Recipe recipe) {
		return recipeService.updateRecipe(id, recipe);
	}
	
	@DeleteMapping("recipes/{id}")
	public void deleteRecipe(@PathVariable("id") int id) {
		recipeService.deleteRecipe(id);
	}
	
	@GetMapping("recipes/{id}/share")
	public void shareRecipe(@PathVariable("id") int id) {
		recipeService.shareRecipe(id);
	}
	
	@PostMapping("recipes/approve")
	public void approveRecipe(@RequestBody Recipe recipe) {
		this.recipeService.approveRecipe(recipe);
	}
	
}
