package com.variaS.recipebook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.variaS.recipebook.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	List<User> findByGoogleSub(@Param("google_sub") String googleSub);
	
	List<User> findByEmail(@Param("email") String email);

	List<User> findByFacebookId(@Param("facebook_id") String facebookId);

}
