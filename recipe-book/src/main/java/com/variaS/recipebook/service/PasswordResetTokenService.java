package com.variaS.recipebook.service;

import com.variaS.recipebook.entity.PasswordResetToken;
import com.variaS.recipebook.entity.User;

public interface PasswordResetTokenService {
	
	public void createTokenForUser(User user, String tokenValue);
	
	public boolean validateToken(String tokenValue);
	
	public void saveOrUpdateUserToken(User user, String token);

	public PasswordResetToken findTokenByValue(String value);

}
