package com.variaS.recipebook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.variaS.recipebook.entity.Authority;
import com.variaS.recipebook.entity.Recipe;

@CrossOrigin("http://localhost:9000")
public interface AuthorityRepository extends JpaRepository<Authority, Integer>{
	
	List<Authority> findByName(@Param("name") String name);

}
