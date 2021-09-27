package com.variaS.recipebook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.variaS.recipebook.entity.Ingredient;

@CrossOrigin
public interface IngredientRepository extends JpaRepository<Ingredient, Integer>{
	
	List<Ingredient> findByRecipeId(@Param("id") int id);

}
