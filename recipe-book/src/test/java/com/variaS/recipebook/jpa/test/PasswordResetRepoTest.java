package com.variaS.recipebook.jpa.test;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import com.variaS.recipebook.dao.PasswordResetTokenRepository;
import com.variaS.recipebook.entity.PasswordResetToken;

import static org.assertj.core.api.Assertions.*;
import static org.junit.Assert.assertTrue;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test-h2")
public class PasswordResetRepoTest {

	@Autowired
	TestEntityManager entityManager;
	
	@Autowired
	PasswordResetTokenRepository repo;
	
	@Test
	public void shouldReturnEmptyListIfNotFound() {
		List<PasswordResetToken> findByToken = repo.findByToken("test");
		assertTrue(findByToken.isEmpty());
	}
	
	@Test
	public void shouldReturnTestEntity() {
		entityManager.persistAndFlush(new PasswordResetToken("test"));
		List<PasswordResetToken> findByToken = repo.findByToken("test");
		assertThat(findByToken).isNotEmpty();
	}


}
