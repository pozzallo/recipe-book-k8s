package com.variaS.recipebookui;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicLoginController {

	@GetMapping("/basic")
	public Principal basicAuth(Principal principal) {
		return principal;
	}

}
