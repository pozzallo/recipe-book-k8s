package com.variaS.recipebook.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
public class UserController {

	@Autowired
	RecipeService recipeService;
	@Autowired
	private UserService userService;
	@Autowired
	private RecipeRepository recipeRep;
	
	@GetMapping("/test")
	public String test() {
		return "Hello World!";
	}

	@GetMapping("/user")
	public ResponseEntity<User> user() {
		User currentUser = userService.getCurrentUser();
		return ResponseEntity.ok(currentUser);
	}

	@GetMapping("/user/recipes")
	public ResponseEntity<List<Recipe>> getUserRecipes() {
		User currentUser = userService.getCurrentUser();
		List<Recipe> recipes = recipeRep.findByUserId(currentUser.getId());
		if (recipes == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(recipes);
	}
	
	@PostMapping("/user/recipes")
	public ResponseEntity<Recipe> saveRecipe( @RequestBody Recipe recipe){
		User currentUser = userService.getCurrentUser();
		Recipe savedRecipe = userService.addRecipe(currentUser.getId(), recipe);
		return ResponseEntity.ok(savedRecipe);
	}
	
	@PostMapping("user")
	public ResponseEntity<User> saveUser( @RequestBody User user){
		try {
			User newUser = userService.registerNewBasicUserAccount(user);
			return ResponseEntity.ok(newUser);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/user/password")
	public void changePassword( @RequestBody Map<String, String> newPassword){
		userService.changePassword(newPassword.get("password"));
	}

}
