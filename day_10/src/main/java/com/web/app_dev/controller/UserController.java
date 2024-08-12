package com.web.app_dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.web.app_dev.dto.AuthRequest;
import com.web.app_dev.model.User;
import com.web.app_dev.service.JwtService;
import com.web.app_dev.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;




@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    @Autowired
    public UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> postuser(@RequestBody User user) {
        User u=userService.findbymail(user.getEmail());
        if(u!=null)
        {
            return ResponseEntity.status(409).build();
        }
        
        user.setRoles("user");
        User u1=userService.registerUser(user);
        return ResponseEntity.ok(u1);
    }

    @PostMapping("/admin")
    public ResponseEntity<User> getadmin(@RequestBody User user){
        User u=userService.findbymail(user.getEmail());
        if(u!=null)
        {
            return ResponseEntity.status(409).build();
        }
        user.setRoles("admin");
        User u1=userService.registerUser(user);
        return ResponseEntity.ok(u1);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
    System.out.println("Received authentication request: " + authRequest);
    try {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        System.out.println("Received authentication request: " + authRequest);
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    } catch (Exception e) {
        System.out.println("Authentication failed: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
    }
}
    
    @PostMapping("/login")
    public ResponseEntity<User> getUser(@RequestBody User user) {
        User u2=userService.findbymail(user.getEmail());
        if(u2!=null && passwordEncoder.matches(user.getPassword(),u2.getPassword())) 
        {
            return ResponseEntity.ok(u2);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser()
    {
        List<User> l = userService.findall();
        if(l!=null)
        {
            return ResponseEntity.ok(l);
        }
        return ResponseEntity.status(401).build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> delResponseEntity(@PathVariable("userId") int userId)
    {
        User u = userService.findby(userId);
        if(u!=null)
        {
            userService.deleted(userId);
            return ResponseEntity.ok("Deleted");
        }
        return ResponseEntity.status(404).body("No User found");
    }
    
    @GetMapping("/{email}")
    public ResponseEntity<User> getMethodName(@PathVariable("email") String email) 
    {
        User u = userService.findbymail(email);
        return ResponseEntity.ok(u);
    }
    
    @PutMapping("/{email}")
    public ResponseEntity<String> update(@PathVariable("email") String email, @RequestBody User user) 
    {
        User u = userService.findbymail(email);
        if(u!=null)
        {
            u.setPassword(user.getPassword());
            u.setConfirmpassword(user.getConfirmpassword());
            userService.registerUser(u);
            return ResponseEntity.ok("User Updated");
        }    
        return ResponseEntity.status(404).body(null);
    }
}
