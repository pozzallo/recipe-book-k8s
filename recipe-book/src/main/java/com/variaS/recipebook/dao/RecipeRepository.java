package com.variaS.recipebook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.variaS.recipebook.entity.Recipe;

@CrossOrigin("http://localhost:9000")
public interface RecipeRepository extends JpaRepository<Recipe, Integer>{
	
	List<Recipe> findByUserId(@Param("id") Integer id);
	
//	@Query(value = "select * from recipes where user_id is null", nativeQuery = true)
//	List<Recipe> findAllGeneral();

}
