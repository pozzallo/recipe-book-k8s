package com.variaS.recipebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.RecipeService;
import com.variaS.recipebook.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserRecipesController {

	@Autowired
	private RecipeService recipeService;
	@Autowired
	private UserService userService;

	@GetMapping("/user/recipes")
	public ResponseEntity<List<Recipe>> getUserRecipes() {
		User currentUser = userService.getCurrentUser();
		List<Recipe> recipes = recipeService.getUserRecipes(currentUser);
		if (recipes == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(recipes);
	}

	@PostMapping("/user/recipes")
	public ResponseEntity<Recipe> saveRecipe(@RequestBody Recipe recipe) {
		User currentUser = userService.getCurrentUser();
		Recipe savedRecipe = userService.addRecipe(currentUser.getId(), recipe);
		return ResponseEntity.ok(savedRecipe);
	}

}
