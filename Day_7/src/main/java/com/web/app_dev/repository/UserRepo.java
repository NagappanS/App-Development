package com.web.app_dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.app_dev.model.User;


@Repository
public interface UserRepo extends JpaRepository<User,Integer>{
    User findByEmail(String email);
    User findByEmailAndPassword(String email,String password);
}
