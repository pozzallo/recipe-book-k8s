package com.variaS.recipebook.service.test;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.variaS.recipebook.dao.IngredientRepository;
import com.variaS.recipebook.dao.RecipeRepository;
import com.variaS.recipebook.dao.UserRepository;
import com.variaS.recipebook.entity.Ingredient;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.UserService;
import com.variaS.recipebook.service.UserServiceImp;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
	
	@Mock
	private UserRepository userRepo;
	
	@Mock
	private RecipeRepository recipeRepo;
	
	@Mock
	private IngredientRepository ingredientRepo;
	
	@Autowired
	@InjectMocks
	private UserServiceImp userService;
	
	private User testUser;

	private Recipe testRecipe;
	
	@BeforeEach
	public void setUp() {
		 this.testUser = new User("Test User", "test@gmail.com", null);
		 this.testUser.setId(1);
		 this.testRecipe = new Recipe(1,"test recipe", "http//test-url", "Recipe for test", new ArrayList<Ingredient>(), testUser);
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void shouldReturnGoogleUserOrNullIfGoogleUserNotFound() {
		// first invocation of getGoogleUser() will return testUser, the second will return empty array
		when(userRepo.findByGoogleSub(anyString())).thenReturn(Arrays.asList(this.testUser), new ArrayList<User>());
		assertEquals(userService.getGoogleUser("test").getName(), "Test User");
		assertNull(userService.getGoogleUser("test"));
	}
	
	@Test
	public void shouldSaveRecipeWhenAddRecipe() {
		when(userRepo.getOne(anyInt())).thenReturn(testUser);
		when(recipeRepo.save(any(Recipe.class))).thenReturn(testRecipe);
		userService.addRecipe(1, testRecipe);
		Mockito.verify(recipeRepo).save(any(Recipe.class));
	}
}
