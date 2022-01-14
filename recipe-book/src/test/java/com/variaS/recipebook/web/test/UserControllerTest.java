package com.variaS.recipebook.web.test;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.ArgumentMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.variaS.recipebook.controller.UserController;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.RecipeService;
import com.variaS.recipebook.service.UserService;

@WebMvcTest(UserController.class)
public class UserControllerTest {
	
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
		 this.testRecipe = new Recipe(1,"test recipe", null, null, null, testUser);
	 }
	 
	
	@Test
	public void shouldReturnCurrentUser() throws Exception {
		when(userService.getCurrentUser()).thenReturn(this.testUser);
		mockMvc.perform(get("/api/user")).andDo(print()).andExpect(status().isOk())
		.andExpect((jsonPath("$.name").value("Test User")));
	}
	
	@Test
	@WithMockUser()
	public void shouldReturnSavedUserWhenSaveUser() throws Exception {
		when(userService.registerNewBasicUserAccount(any())).thenReturn(this.testUser);
		String content = new ObjectMapper().writer().writeValueAsString(this.testUser);
		mockMvc.perform(post("/api/user").contentType(MediaType.APPLICATION_JSON).content(content))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$.name").value("Test User"));
	}
	
	@Test
	@WithMockUser()
	public void shouldReturnConflictStatusWhenThrowIllegalArgsExceptin() throws Exception {
		when(userService.registerNewBasicUserAccount(any())).thenThrow(new IllegalArgumentException());
		String content = new ObjectMapper().writer().writeValueAsString(this.testUser);
		mockMvc.perform(post("/api/user").contentType(MediaType.APPLICATION_JSON).content(content))
		.andDo(print())
		.andExpect(status().is(409));
	}
	
	

}
