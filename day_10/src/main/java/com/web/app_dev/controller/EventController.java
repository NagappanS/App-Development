package com.web.app_dev.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.app_dev.model.Event;
import com.web.app_dev.service.EventService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin
public class EventController {
    @Autowired
    public EventService eventService;

    @PostMapping("/event")
    public ResponseEntity<String> savString(@RequestBody Event event) {
        if(eventService.isBooked(event.getEventname()))
        {
            return ResponseEntity.status(400).body("Event already booked");
        }
        Event e=eventService.saEvent(event);
        if(e!=null)
        {
            return ResponseEntity.ok("Event Booked");
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/event")
    public ResponseEntity<List<Event>> getall() {
        List<Event> e=eventService.findall();
        return ResponseEntity.ok(e);
    }
    
    @GetMapping("/event/{id}")
    public ResponseEntity<String> getid(@PathVariable("id") int id) {
        Event e1=eventService.findid(id);
        if(e1!=null)
        {
            return ResponseEntity.ok("Found ");
        }
        return ResponseEntity.status(404).build();
    }
    
    @DeleteMapping("/event/{id}")
    public ResponseEntity<String> delEntity(@PathVariable("id") int id)
    {
        eventService.deleted(id);
        return ResponseEntity.ok("User Deleted");
    }
}
