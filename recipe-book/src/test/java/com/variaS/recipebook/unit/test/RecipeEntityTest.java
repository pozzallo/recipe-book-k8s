package com.variaS.recipebook.unit.test;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.variaS.recipebook.entity.Ingredient;
import com.variaS.recipebook.entity.Recipe;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class RecipeEntityTest {

	@Nested
	public class AddIngredientMethodTest {

		@Test
		public void shouldCreateNewIngredientListIfItIsNull() {
			Recipe testRecipe = new Recipe();
			testRecipe.setIngredients(null);
			testRecipe.add(new Ingredient());
			assertNotNull(testRecipe.getIngredients());
		}

		@Test
		public void shouldSetRecipeToIngredient() {
			Recipe testRecipe = new Recipe();
			testRecipe.add(new Ingredient());
			List<Ingredient> ingredients = testRecipe.getIngredients();
			assertThat(ingredients).allSatisfy(ingredient -> {
				assertThat(ingredient.getRecipe()).isEqualTo(testRecipe);
			});
		}
	}

}
