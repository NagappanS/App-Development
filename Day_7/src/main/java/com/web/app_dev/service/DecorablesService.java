package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.Decorables;
import com.web.app_dev.repository.DecorablesRepo;

@Service
public class DecorablesService {
    @Autowired
    public DecorablesRepo decorablesRepo;
    
    public Decorables savDecorables(Decorables decorables)
    {
        return decorablesRepo.save(decorables);
    }

    public List<Decorables> getall()
    {
        return decorablesRepo.findAll();
    }

    public Decorables findbyid(Long id)
    {
        return decorablesRepo.findById(id).orElse(null);
    }

    public void deleted(Long id)
    {
        decorablesRepo.deleteById(id);
    }
}
