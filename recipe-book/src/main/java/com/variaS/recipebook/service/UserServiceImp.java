package com.variaS.recipebook.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.variaS.recipebook.dao.AuthorityRepository;
import com.variaS.recipebook.dao.IngredientRepository;
import com.variaS.recipebook.dao.RecipeRepository;
import com.variaS.recipebook.dao.UserRepository;
import com.variaS.recipebook.entity.Authority;
import com.variaS.recipebook.entity.Ingredient;
import com.variaS.recipebook.entity.Recipe;
import com.variaS.recipebook.entity.User;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RecipeRepository recipeRepo;
	@Autowired
	private IngredientRepository ingredientRepo;

	@Autowired
	private AuthorityRepository authRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User getGoogleUser(String googleSub) {
		List<User> findByGoogleSub = userRepo.findByGoogleSub(googleSub);
		if (findByGoogleSub.isEmpty()) {
			return null;
		}
		return findByGoogleSub.get(0);
	}

	@Override
	@Transactional
	public Recipe addRecipe(int userId, Recipe recipe) {
		User user = userRepo.getOne(userId);
		List<Ingredient> userRecipeIngredients = new ArrayList<Ingredient>();
		Recipe userRecipe = new Recipe();
		userRecipe.setName(recipe.getName());
		userRecipe.setDescription(recipe.getDescription());
		userRecipe.setImageUrl(recipe.getImageUrl());
		userRecipe.setUser(user);
		Recipe savedRecipe = recipeRepo.save(userRecipe);

		userRecipeIngredients = recipe.getIngredients();
		userRecipeIngredients.forEach(ingr -> {
			ingr.setId(0);
			ingr.setRecipe(savedRecipe);
		});
		ingredientRepo.saveAll(userRecipeIngredients);

		return savedRecipe;
	}

	@Override
	public User getCurrentUser() {
		User currentUser = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			if (authentication instanceof UsernamePasswordAuthenticationToken) {
				currentUser = getBasicUser(authentication);
			}else if (authentication instanceof OAuth2AuthenticationToken) {
				currentUser = getOAuthUser(authentication);
			}
		}
		return currentUser;
	}

	private User getOAuthUser(Authentication authentication) {
		User currentUser = null;
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
		String clientRegistrationId = oauthToken.getAuthorizedClientRegistrationId();
		OAuth2User principal = (OAuth2User) authentication.getPrincipal();
		// check if that e-mail already exists
		if(isEmailExist(principal.getAttribute("email"))) {
			// if exists update user account
			currentUser = updateUserAccountInfo(principal, clientRegistrationId);
		}else {
			// if not exists register new user account
			currentUser = registerNewOauthUserAccount(principal);
		}
//		if (clientRegistrationId.equals("facebook")) {
//			String facebookId = (String) principal.getAttribute("id");
//			currentUser = getFacebokUser(facebookId);
//		}else if(clientRegistrationId.equals("google")) {
//			String googleSub = (String) principal.getAttribute("sub");
//			currentUser = getGoogleUser(googleSub);
//		}
//		if(currentUser == null) {
//			currentUser = registerNewOauthUserAccount(principal);
//		}
		return currentUser;
	}

	private User updateUserAccountInfo(OAuth2User principal, String accountType) {
		User user = userRepo.findByEmail(principal.getAttribute("email")).get(0);
		if(accountType.equals("google")) {
			user.setGoogleSub(principal.getAttribute("sub"));
		}else if(accountType.equals("facebook")) {
			user.setFacebookId(principal.getAttribute("id"));
		}
		return userRepo.save(user);
	}

	private User getFacebokUser(String facebookId) {
		List<User> findByFacebookId = userRepo.findByFacebookId(facebookId);
		if (findByFacebookId.isEmpty()) {
			return null;
		}
		return findByFacebookId.get(0);
	}

	private User getBasicUser(Authentication authentication) {
		User currentUser = null;
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) authentication
				.getPrincipal();
		String userName = principal.getUsername();
		if (userName != null) {
			List<User> findByEmail = userRepo.findByEmail(userName);
			if (!findByEmail.isEmpty()) {
				currentUser = findByEmail.get(0);
			}
		}
		return currentUser;
	}

	public User registerNewOauthUserAccount(OAuth2User principal) {
		String email = (String) principal.getAttribute("email");
//		if (isEmailExist(email)) {
//			throw new IllegalArgumentException("Such E-mail already exists!");
//		}
		String name = (String) principal.getAttribute("name");
		String googleSub = (String) principal.getAttribute("sub");
		String facebookId = (String) principal.getAttribute("id");
		User newUser = new User(name, email, googleSub);
		newUser.setFacebookId(facebookId);
		List<Authority> roleUser = authRepo.findByName("ROLE_USER");
		newUser.setAuthorities(roleUser);
		newUser = userRepo.save(newUser);
		return newUser;
	}

	@Override
	public User registerNewBasicUserAccount(User newUser) {
		if (isEmailExist(newUser.getEmail())) {
			throw new IllegalArgumentException("Such E-mail already exists!");
		}
		String password = passwordEncoder.encode(newUser.getPassword());
		newUser.setPassword(password);
		newUser.setEnabled(1);
		List<Authority> roleUser = authRepo.findByName("ROLE_USER");
		newUser.setAuthorities(roleUser);
		User savedUser = userRepo.save(newUser);
		return savedUser;
	}

	@Override
	@Transactional
	public void changePassword(String newPass) {
		User currentUser = getCurrentUser();
		Optional<User> findById = userRepo.findById(currentUser.getId());
		currentUser = findById.get();
		currentUser.setPassword(passwordEncoder.encode(newPass));
		userRepo.save(currentUser);	
	}
	
	private boolean isEmailExist(String email) {
		List<User> findByEmail = userRepo.findByEmail(email);
		return !findByEmail.isEmpty();		
	}

}
