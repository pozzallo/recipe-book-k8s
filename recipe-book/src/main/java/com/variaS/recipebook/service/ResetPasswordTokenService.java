package com.variaS.recipebook.service;

import com.variaS.recipebook.entity.User;

public interface ResetPasswordTokenService {
	
	public void createTokenForUser(User user, String tokenValue);
	
	public boolean validateToken(String tokenValue);
	
	public void saveOrUpdateUserToken(User user, String token);

}
