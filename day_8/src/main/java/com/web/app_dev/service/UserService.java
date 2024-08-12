package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.User;
import com.web.app_dev.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    public UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setConfirmpassword(passwordEncoder.encode(user.getConfirmpassword()));
        return userRepo.save(user);
    }

    public User findbymail(String email)
    {
        return userRepo.findByEmail(email);
    }

    public User findbymailandpass(String a,String b)
    {
        return userRepo.findByEmailAndConfirmpassword(a,b);
    }

    public List<User> findall()
    {
        return userRepo.findAll();
    }

    public User findby(int id)
    {
        return userRepo.findById(id).orElse(null);
    }

    public User findbyrole(String role)
    {
        return userRepo.findByRoles(role);
    }

    public void deleted(int id)
    {
        userRepo.deleteById(id);
    }
}
