package com.web.app_dev.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.app_dev.model.User;


@Repository
public interface UserRepo extends JpaRepository<User,Integer>{
    User findByEmail(String email);
    User findByEmailAndPassword(String email,String password);
    User findByEmailAndConfirmpassword(String email,String password);
    Optional<User> findByName(String username);
    User findByRoles(String role);
}
