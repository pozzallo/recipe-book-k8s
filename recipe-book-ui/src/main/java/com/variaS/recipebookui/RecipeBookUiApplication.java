package com.variaS.recipebookui;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
@EnableZuulProxy
@CrossOrigin
public class RecipeBookUiApplication extends WebSecurityConfigurerAdapter {

	@Autowired
	private DataSource dataSource;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

		String sql = "select users.email, authority.name\n" + "from authorities \n"
				+ "left join users on authorities.user_id = users.id\n"
				+ "left join authority on authorities.authority = authority.id\n" + "where users.email = ?";

		auth.jdbcAuthentication().dataSource(dataSource)
				.usersByUsernameQuery("select email,password,enabled " + "from users " + "where email = ?")
				.authoritiesByUsernameQuery(sql);

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests(a -> a.antMatchers("/", "/error", "/*.js", "/*.css", "/*.ico", "/index.html",
				"/api/recipes", "/api/recipes/*", "/recipes/all/**", "/api/user").permitAll()
				.anyRequest().authenticated())
				.exceptionHandling(e -> e.authenticationEntryPoint(authenticationEntryPoint()))
				.oauth2Login()
				.and().httpBasic().authenticationEntryPoint(authenticationEntryPoint()).and().csrf()
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
				.logout(l -> l.logoutSuccessUrl("/").permitAll());
	}

	public static void main(String[] args) {
		SpringApplication.run(RecipeBookUiApplication.class, args);
	}

	@GetMapping("/")
	public String home() {
		return "index.html";
	}

	// for monitoring with spring-actuator
	@Bean
	public HttpTraceRepository httpTraceRepository() {
		return new InMemoryHttpTraceRepository();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationEntryPoint authenticationEntryPoint() {
		return new BasicAuthenticationEntryPoint();
	}
}
