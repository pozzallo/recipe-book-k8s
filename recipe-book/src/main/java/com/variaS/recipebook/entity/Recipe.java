package com.variaS.recipebook.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "recipes")
public class Recipe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "is_pending_to_approve")
	private boolean isPendingToApprove;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
	private List<Ingredient> ingredients = new ArrayList<Ingredient>();
	
	@ManyToOne
	@JoinColumn(name = "user_id")
//	@JsonIgnore
	private User user;
	
	public Recipe() {
		super();
	}

	public Recipe(Integer id, String name, String imageUrl, String description,
			List<Ingredient> ingredients, User user) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.ingredients = ingredients;
		this.user = user;
	}

	public void add(Ingredient ingredient) {
		if(ingredient != null) {
			if(ingredients == null) {
				ingredients = new ArrayList<Ingredient>();
			}
			ingredients.add(ingredient);
			ingredient.setRecipe(this);
		}
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Recipe id=" + id + " Ingredients: " + ingredients ;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isPendingToApprove() {
		return isPendingToApprove;
	}

	public void setPendingToApprove(boolean isPendingToApprove) {
		this.isPendingToApprove = isPendingToApprove;
	}
	

}
