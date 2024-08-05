package com.web.app_dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.web.app_dev.model.EcoPlan;
import com.web.app_dev.service.EcoPlanService;

@RestController
@CrossOrigin
public class EcoPlanController {
    @Autowired
    public EcoPlanService ecoPlanService;

    @PostMapping("/cart")
    public ResponseEntity<EcoPlan> savEcoPlan(@RequestBody EcoPlan ecoPlan)
    {
        EcoPlan e=ecoPlanService.savEcoPlan(ecoPlan);
        if(e!=null)
        {
            return ResponseEntity.ok(e);
        }
        return ResponseEntity.status(401).build();
    }

     @GetMapping("/cart")
    public ResponseEntity<List<EcoPlan>> getall()
    {
        List<EcoPlan> l=ecoPlanService.getall();
        if(l!=null)
        {
            return ResponseEntity.ok(l);
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/cart/{id}")
    public ResponseEntity<EcoPlan> fEntity(@PathVariable("id") Long id)
    {
        EcoPlan d1=ecoPlanService.getbyid(id);
        if(d1!=null)
        {
            return ResponseEntity.ok(d1);
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<Void> deleEntity(@PathVariable("id") Long id)
    {
        ecoPlanService.deleted(id);
        return ResponseEntity.noContent().build();
    }
}
