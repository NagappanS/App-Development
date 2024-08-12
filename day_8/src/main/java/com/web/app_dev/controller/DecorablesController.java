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

import com.web.app_dev.model.Decorables;
import com.web.app_dev.service.DecorablesService;

@RestController
@CrossOrigin
public class DecorablesController {
    @Autowired
    public DecorablesService decorablesService;
    
    @PostMapping("/selectedItems")
    public ResponseEntity<Decorables> saEntity(@RequestBody Decorables decorables)
    {
        Decorables d=decorablesService.savDecorables(decorables);
        if(d!=null)
        {
            return ResponseEntity.ok(d);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/selectedItems")
    public ResponseEntity<List<Decorables>> getall()
    {
        List<Decorables> l=decorablesService.getall();
        if(l!=null)
        {
            return ResponseEntity.ok(l);
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("/selectedItems/{id}")
    public ResponseEntity<Decorables> fEntity(@PathVariable("id") Long id)
    {
        Decorables d1=decorablesService.findbyid(id);
        if(d1!=null)
        {
            return ResponseEntity.ok(d1);
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/selectedItems/{id}")
    public ResponseEntity<Void> deleEntity(@PathVariable("id") Long id)
    {
        decorablesService.deleted(id);
        return ResponseEntity.noContent().build();
    }
}
