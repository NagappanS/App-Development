package com.web.app_dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.app_dev.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {
    Admin findByEmail(String a);
    Admin findByEmailAndPassword(String a,String b);
}
