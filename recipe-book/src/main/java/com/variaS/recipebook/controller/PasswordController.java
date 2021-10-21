package com.variaS.recipebook.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.variaS.recipebook.dao.PasswordResetTokenRepository;
import com.variaS.recipebook.dao.UserRepository;
import com.variaS.recipebook.entity.PasswordResetToken;
import com.variaS.recipebook.entity.User;
import com.variaS.recipebook.service.ResetPasswordTokenService;
import com.variaS.recipebook.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PasswordController {
	
	@Autowired
	private ResetPasswordTokenService tokenService;
	@Autowired
	private PasswordResetTokenRepository tokenRepo;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JavaMailSender javaMailSender;
	
	
	@PostMapping("/user/password")
	public void changePassword(@RequestBody Map<String, String> newPassword) {
		userService.changePassword(newPassword.get("password"));
	}

	@PostMapping("/user/sendResetPasswordToken")
	public ResponseEntity sendResetPasswordToken(HttpServletRequest request, @RequestBody String email) {
		// check if email exist
		List<User> findByEmail = userRepo.findByEmail(email);
		if (findByEmail.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		// generate reset token
		String token = UUID.randomUUID().toString();
		tokenService.saveOrUpdateUserToken(findByEmail.get(0), token);
		System.out.println("Send email....");
		// send email
		String link = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
				+ "/api/user/validateToken?token=" + token;
//		String link = "http://localhost:9000/api/user/validateToken?token=" + token;
		String content = "<p>Hello,</p>" + "<p>You have requested to reset your password.</p>"
				+ "<p>Click the link below to change your password:</p>" + "<p><a href=\"" + link
				+ "\">Change my password</a></p>" + "<br>" + "<p>Ignore this email if you do remember your password, "
				+ "or you have not made the request.</p>";
		try {
			sendMimeEmail(email, "Reset password", content);
			System.out.println("-- email was sent--");
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/user/validateToken")
	public ResponseEntity validateToken(@RequestParam("token") String tokenValue) {
		boolean isValidToken = tokenService.validateToken(tokenValue);
		if(isValidToken) {
	        String redirectUrl = "http://localhost:9000/reset-password?token=" + tokenValue;
	        return ResponseEntity.status(HttpStatus.PERMANENT_REDIRECT).location(URI.create(redirectUrl)).build();
		}else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PostMapping("user/resetPassword")
	public ResponseEntity resetPassword(@RequestBody Map<String, String> body) { 
		String tokenValue = body.get("token");
		// validate token
		boolean isValidToken = tokenService.validateToken(tokenValue);
		// token invalid send error response
		if(!isValidToken) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		// token valid
		// get user from token
		PasswordResetToken token = tokenRepo.findByToken(tokenValue).get(0);
		User user = token.getUser();
		
		// change password for user
		userService.resetUserPassword(body.get("password"), user.getId());
		
		// delete reset token as it is not needed
		token.setUser(null);
		tokenRepo.delete(token);
		
		return ResponseEntity.ok().build();
	}

	private void sendMimeEmail(String recipientEmail, String subject, String content) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(recipientEmail);
		helper.setSubject(subject);
		helper.setText(content, true);
		javaMailSender.send(message);
	}

}
