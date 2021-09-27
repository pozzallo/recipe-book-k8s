package com.variaS.recipebookui;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;

public class BasicAuthenticationEntryPoint implements AuthenticationEntryPoint{
	
	private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		
		  response.setStatus(HttpStatus.UNAUTHORIZED.value());
	        Map<String, Object> data = new HashMap<>();
	        data.put(
	          "timestamp", 
	          Calendar.getInstance().getTime());
	        data.put(
	          "message", 
	          authException.getMessage());

	        response.getOutputStream()
	          .println(objectMapper.writeValueAsString(data));
	}

}
