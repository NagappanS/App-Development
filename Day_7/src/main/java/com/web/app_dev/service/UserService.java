package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.User;
import com.web.app_dev.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    public UserRepo userRepo;

    
    public User registerUser(User user)
    {
        return userRepo.save(user);
    }

    public User findbymail(String email)
    {
        return userRepo.findByEmail(email);
    }

    public User findbymailandpass(String a,String b)
    {
        return userRepo.findByEmailAndPassword(a,b);
    }

    public List<User> findall()
    {
        return userRepo.findAll();
    }
}
