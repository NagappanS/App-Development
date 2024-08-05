package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.CakeSec;
import com.web.app_dev.repository.CakeSecRepo;

@Service
public class CakeSecService {
    @Autowired
    public CakeSecRepo cakeSecRepo;
    
    public CakeSec savCakeSec(CakeSec cakeSec)
    {
        return cakeSecRepo.save(cakeSec);
    }

    public CakeSec findCake(int id)
    {
        return cakeSecRepo.findById(id).orElse(null);
    }

    public List<CakeSec> find()
    {
        return cakeSecRepo.findAll();
    }
}
