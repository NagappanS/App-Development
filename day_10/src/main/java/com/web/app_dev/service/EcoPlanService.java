package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.EcoPlan;
import com.web.app_dev.repository.EcoPlanRepo;

@Service
public class EcoPlanService {
    @Autowired
    public EcoPlanRepo ecoPlanRepo;
    
    public EcoPlan savEcoPlan(EcoPlan ecoPlan)
    {
        return ecoPlanRepo.save(ecoPlan);
    }
     
    public List<EcoPlan> getall()
    {
        return ecoPlanRepo.findAll();
    }
    
    public EcoPlan getbyid(Long id)
    {
        return ecoPlanRepo.findById(id).orElse(null);
    }

    public void deleted(Long id)
    {
        ecoPlanRepo.deleteById(id);
    }

}
