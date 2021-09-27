package com.variaS.recipebook.service;

import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;

public interface UserService  {
	
	public User getGoogleUser(String googleSub);

	public Recipe addRecipe(int userId, Recipe recipe);
	
	public User getCurrentUser();
	
	public User registerNewBasicUserAccount(User newUser) throws IllegalArgumentException;

	public void changePassword(String string);
	

}
