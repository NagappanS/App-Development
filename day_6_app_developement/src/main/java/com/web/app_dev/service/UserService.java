package com.web.app_dev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    public UserRepo userRepo;
    
}
