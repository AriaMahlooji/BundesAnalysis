package com.api.bundes.rest;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EventRestController {
    private EventService eventService;

    public EventRestController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/events")
    public List<Event> getAllEvents()
    {
        return eventService.getAllEvents();
    }
}
