package com.variaS.recipebook;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests(a -> a
                .antMatchers("/api/test", "/api/recipes", "/api/recipes/*", "/recipes/all/**", "/api/user", 
                			"/api/user/resetPassword", "/api/user/validateToken", "/api/user/sendResetPasswordToken").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user").anonymous()
                .anyRequest().authenticated());
	}

}
