package com.web.app_dev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.Admin;
import com.web.app_dev.repository.AdminRepository;

@Service
public class AdminService {
    @Autowired
    public AdminRepository adminRepository;

    public Admin saveAdmin(Admin admin)
    {
        return adminRepository.save(admin);
    }

    public Admin findbymail(String a)
    {
        return adminRepository.findByEmail(a);
    }

    public Admin findbymailandpass(String a,String b)
    {
        return adminRepository.findByEmailAndPassword(a,b);
    }
}
