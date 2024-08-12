package com.web.app_dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.app_dev.model.Event;

@Repository
public interface EventRepo extends JpaRepository<Event,Integer>{
       Event findByEventname(String a);
}
