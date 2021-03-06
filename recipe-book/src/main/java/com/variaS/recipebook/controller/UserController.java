package com.variaS.recipebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/user")
	public ResponseEntity<User> user() {
		User currentUser = userService.getCurrentUser();
		return ResponseEntity.ok(currentUser);
	}

	@PostMapping("/user")
	public ResponseEntity<User> saveUser(@RequestBody User user) {
		try {
			User newUser = userService.registerNewBasicUserAccount(user);
			return ResponseEntity.ok(newUser);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
	}

}
