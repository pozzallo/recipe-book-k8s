package com.variaS.recipebook.jpa.test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import com.variaS.recipebook.dao.RecipeRepository;
import com.variaS.recipebook.entity.Ingredient;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.RecipeService;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test-h2")
public class UpdateRecipeIT {
	
	@Autowired
	TestEntityManager entityManager;
	
	@Autowired
	RecipeRepository recipeRepo;
	
	@Autowired
	RecipeService recipeService;
	
	Recipe persistendRecipe;
	
	@BeforeEach
	public void setUp() {
		Recipe newRecipe = new Recipe(null,"Test recipe", "testUrl", "Test Recipe",
				 null, null);
		persistendRecipe = entityManager.persistAndFlush(newRecipe);
		Ingredient persistIngr = entityManager.persistAndFlush(new Ingredient(null, "Test ingr", 1, persistendRecipe));
		persistendRecipe.setIngredients(Arrays.asList(persistIngr, null));
		persistendRecipe = entityManager.persistAndFlush(persistendRecipe);
	}
	
	@Test
	public void updateRecipeTest() {
		Recipe testRecipe = recipeRepo.findById(persistendRecipe.getId()).get();
		assertEquals("New recipe", testRecipe.getName());
		assertThat(testRecipe.getIngredients()).containsNull();
		
		recipeService.updateRecipe(persistendRecipe.getId(), 
				new Recipe(0,"New recipe", "testUrl", "Test Recipe",
						Arrays.asList(new Ingredient(null, "New ingr", 1, persistendRecipe)), null));

						//TODO:
		
		
		
	}

}
