package com.web.app_dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.web.app_dev.model.CakeSec;
import com.web.app_dev.service.CakeSecService;

@RestController
@CrossOrigin
public class CakeSecController {
    @Autowired
    public CakeSecService cakeSecService;

    @PostMapping("/orders")
    public ResponseEntity<CakeSec> saEntity(@RequestBody CakeSec cakeSec)
    {
        CakeSec c=cakeSecService.savCakeSec(cakeSec);
        if(c!=null)
        {
            return ResponseEntity.ok(c);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<CakeSec> findEntity(@PathVariable("id") int id)
    {
        CakeSec c1=cakeSecService.findCake(id);
         return ResponseEntity.ok(c1);   
    }

    @GetMapping("/orders")
    public ResponseEntity<List<CakeSec>> fiEntity()
    {
        List<CakeSec> l = cakeSecService.find();
        return ResponseEntity.ok(l);
    }
}
