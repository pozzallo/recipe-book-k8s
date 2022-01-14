package com.variaS.recipebook.service.test;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.variaS.recipebook.dao.IngredientRepository;
import com.variaS.recipebook.dao.RecipeRepository;
import com.variaS.recipebook.entity.Ingredient;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.RecipeService;
import com.variaS.recipebook.service.RecipeServiceImp;

import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;


@ExtendWith(MockitoExtension.class)
public class RecipeServiceTest {
	
	@Autowired
	@InjectMocks
	RecipeServiceImp service;
	
	@Mock
	private RecipeRepository recipeRepository;

	@Mock
	private IngredientRepository ingredientRepository;
	
	
	@Test
	public void shouldNotAddNullIngredient() {
		Recipe newRecipe = new Recipe(0,"New recipe", "testUrl", "Test Recipe",
				 null, new User("user", "@mail", null));
		List <Ingredient> ingredients = new ArrayList<Ingredient>();
		ingredients.add(new Ingredient(1, "New ingr", 1, newRecipe));
		ingredients.add(null);
		
		newRecipe.setIngredients(ingredients);

		Recipe oldRecipe = new Recipe();
		
		when(recipeRepository.getOne(0)).thenReturn(oldRecipe);
		when(recipeRepository.save(any())).thenReturn(oldRecipe);
		
		Recipe updatedRecipe = service.updateRecipe(0, newRecipe);
		
		assertThat(newRecipe.getIngredients()).containsNull();
		assertThat(updatedRecipe.getIngredients()).doesNotContainNull();
	}

}
