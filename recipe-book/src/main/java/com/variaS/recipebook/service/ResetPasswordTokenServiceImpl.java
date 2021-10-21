package com.variaS.recipebook.service;

import java.util.Calendar;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.variaS.recipebook.dao.PasswordResetTokenRepository;
import com.variaS.recipebook.entity.PasswordResetToken;
import com.variaS.recipebook.entity.User;
@Service
public class ResetPasswordTokenServiceImpl implements ResetPasswordTokenService{
	
	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepo;

	@Override
	@Transactional
	public void createTokenForUser(User user, String tokenValue) {
	    PasswordResetToken myToken = new PasswordResetToken(tokenValue, user);
	    passwordResetTokenRepo.save(myToken);	
	}

	@Override
	public boolean validateToken(String tokenValue) {
		boolean result = false;
		List<PasswordResetToken> findByToken = passwordResetTokenRepo.findByToken(tokenValue);
		if(!findByToken.isEmpty() && !isTokenExpired(findByToken.get(0))) {
			result = true;
		}
		return result;
	}
	
	@Override
	public void saveOrUpdateUserToken(User user, String token) {
		// check if user already have a token
		List<PasswordResetToken> userTokens = passwordResetTokenRepo.findByUserId(user.getId());
		// generate new token
		if (userTokens.isEmpty()) {
			createTokenForUser(user, token);
		} else {
			// update existing one
			PasswordResetToken userToken = user.getPasswordResetToken();
			userToken.updateToken(token);
			passwordResetTokenRepo.save(userToken);
		}
	}

	private boolean isTokenExpired(PasswordResetToken passToken) {
	    final Calendar cal = Calendar.getInstance();
	    return passToken.getExpiryDate().before(cal.getTime());
	}

}
