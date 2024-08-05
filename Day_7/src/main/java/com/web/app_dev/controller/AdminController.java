package com.web.app_dev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.app_dev.model.Admin;
import com.web.app_dev.service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
    
    @Autowired
    public AdminService adminService;

    @PostMapping("/admin")
    public ResponseEntity<Admin> savEntity(@RequestBody Admin admin)
    {
        Admin a=adminService.findbymail(admin.getEmail());
        if(a!=null)
        {
             return ResponseEntity.status(409).build();
        }
        Admin b=adminService.saveAdmin(admin);
        return ResponseEntity.ok(b);
    }

    @GetMapping("/admin")
    public ResponseEntity<Admin> getmailandpass(@RequestParam String email,@RequestParam String  password)
    {
        Admin ad=adminService.findbymailandpass(email,password);
        if(ad!=null)
        {
            return ResponseEntity.ok(ad);
        }
        return ResponseEntity.status(404).build();
    }
}
