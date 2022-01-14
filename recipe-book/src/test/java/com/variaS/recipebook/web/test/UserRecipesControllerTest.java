package com.variaS.recipebook.web.test;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.variaS.recipebook.controller.UserRecipesController;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.RecipeService;
import com.variaS.recipebook.service.UserService;

@WebMvcTest(UserRecipesController.class)
public class UserRecipesControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@MockBean
	private RecipeService recipeService;

	User testUser;

	Recipe testRecipe;

	@BeforeEach
	public void setUp() {
		this.testUser = new User("Test User", "test@gmail.com", null);
		this.testUser.setId(1);
		this.testRecipe = new Recipe(1, "test recipe", null, null, null, testUser);
	}

	@Test
	@WithMockUser()
	public void shouldReturnUserRecipesList() throws Exception {
		when(userService.getCurrentUser()).thenReturn(this.testUser);
		when(recipeService.getUserRecipes(any(User.class))).thenReturn(Arrays.asList(this.testRecipe));
		mockMvc.perform(get("/api/user/recipes")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect((jsonPath("$.[0].name").value("test recipe")));
	}

	@Test
	@WithMockUser()
	public void shouldReturnNotFoundWhenRecipesListIsNull() throws Exception {
		when(recipeService.getUserRecipes(any())).thenReturn(null);
		mockMvc.perform(get("/api/user/recipes")).andDo(print()).andExpect(status().is(404));
	}

	@Test
	@WithMockUser()
	public void shouldReturnSavedRecipeWhenSaveRecipe() throws Exception {
		when(userService.getCurrentUser()).thenReturn(this.testUser);
		when(userService.addRecipe(anyInt(), any(Recipe.class))).thenReturn(this.testRecipe);
		ObjectWriter ow = new ObjectMapper().writer();
		String requestJson = ow.writeValueAsString(this.testRecipe);
		mockMvc.perform(post("/api/user/recipes").contentType(MediaType.APPLICATION_JSON).content(requestJson))
				.andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect((jsonPath("$.name").value("test recipe")));
	}

}
