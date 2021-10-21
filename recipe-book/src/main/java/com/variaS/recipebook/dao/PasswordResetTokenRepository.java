package com.variaS.recipebook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.variaS.recipebook.entity.PasswordResetToken;

@CrossOrigin(origins = "*")
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer>{
	
	List<PasswordResetToken> findByUserId(@Param("id") Integer id);
	
	List<PasswordResetToken> findByToken(@Param("token") String token);

}
