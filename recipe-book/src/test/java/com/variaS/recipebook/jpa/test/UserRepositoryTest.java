package com.variaS.recipebook.jpa.test;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import com.variaS.recipebook.dao.UserRepository;
import com.variaS.recipebook.entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class UserRepositoryTest {
 
	@Autowired
	UserRepository userRepo;

	@Autowired
	TestEntityManager entityManager;

	User testUser;

	@BeforeEach
	public void setUp() {
		testUser = new User();
		testUser.setName("test user");
		testUser.setEmail("test@mail");
	}

	@Test
	public void shouldReturnUserByGoogleSub() {
		testUser.setGoogleSub("test");
		entityManager.persistAndFlush(testUser);
		List<User> findByGoogleSub = userRepo.findByGoogleSub("test");
		assertNotNull(findByGoogleSub);
		assertTrue(!findByGoogleSub.isEmpty());
		assertEquals("test user", findByGoogleSub.get(0).getName());
	}

	@Test
	public void shouldReturnUserByEmail() {
		testUser.setEmail("test@email.com");
		entityManager.persistAndFlush(testUser);
		List<User> findByGoogleSub = userRepo.findByEmail("test@email.com");
		assertNotNull(findByGoogleSub);
		assertTrue(!findByGoogleSub.isEmpty());
		assertEquals("test user", findByGoogleSub.get(0).getName());
	}

}
