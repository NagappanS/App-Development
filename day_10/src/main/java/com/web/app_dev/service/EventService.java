package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.Event;
import com.web.app_dev.repository.EventRepo;

@Service
public class EventService {
    @Autowired
    public EventRepo eventRepo;

    public Event saEvent(Event event)
    {
        return eventRepo.save(event);
    }

    public List<Event> findall()
    {
        return eventRepo.findAll();
    }

    public Boolean isBooked(String a)
    {
        Event e=eventRepo.findByEventname(a);
        return e!=null;
    }

    public Event findid(int id)
    {
        return eventRepo.findById(id).orElse(null);
    }

    public void deleted(int id)
    {
        eventRepo.deleteById(id);
    }
}
