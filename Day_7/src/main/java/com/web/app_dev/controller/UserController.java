package com.web.app_dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.web.app_dev.model.User;
import com.web.app_dev.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    public UserService userService;

    @PostMapping("/users")
    public ResponseEntity<User> postuser(@RequestBody User user) {
        User u=userService.findbymail(user.getEmail());
        if(u!=null)
        {
            return ResponseEntity.status(409).build();
        }
        User u1=userService.registerUser(user);
        return ResponseEntity.ok(u1);
    }
    
    @PostMapping("/users/login")
    public ResponseEntity<User> getUser(@RequestBody User user) {
        User u2=userService.findbymailandpass(user.getEmail(),user.getPassword());
        if(u2!=null)
        {
            return ResponseEntity.ok(u2);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser()
    {
        List<User> l = userService.findall();
        if(l!=null)
        {
            return ResponseEntity.ok(l);
        }
        return ResponseEntity.status(401).build();
    }
    
}
