package com.variaS.recipebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.web.http.CookieHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

@SpringBootApplication
public class RecipeBookApplication extends WebSecurityConfigurerAdapter{

	public static void main(String[] args) {
		SpringApplication.run(RecipeBookApplication.class, args);
	}
	
	@Bean
	public HttpSessionIdResolver httpSessionIdResolver() {
		//uses a cookie to obtain the session
	    return new CookieHttpSessionIdResolver(); 
	}
	
	@Bean
	public PasswordEncoder encoder() {
	    return new BCryptPasswordEncoder();
	}

	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests(a -> a
                .antMatchers("/api/recipes", "/api/recipes/*", "/recipes/all/**", "api/user").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user").anonymous()
                .anyRequest().authenticated());
	}

}
