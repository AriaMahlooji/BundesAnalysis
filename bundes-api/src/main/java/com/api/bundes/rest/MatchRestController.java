package com.api.bundes.rest;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.dto.EventFilter;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import com.api.bundes.dto.EventsResponse;
import com.api.bundes.dto.GoalEngagedPlayers;
import com.api.bundes.service.EventService;
import com.api.bundes.service.MatchService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchRestController {

    private MatchService matchService;
    private EventService eventService;

    public MatchRestController(MatchService matchService, EventService eventService) {
        this.matchService = matchService;
        this.eventService = eventService;

    }

    @GetMapping("/matches")
    public List<Match> getAllMatches()
    {
        return matchService.findAll();
    }

    @GetMapping("/matches/{id}")
    public ResponseEntity<?> getMatchById(@PathVariable Integer id)
    {
        Optional<Match> match = matchService.findById(id);
        if(match.isEmpty())
        {
            String errorMessage = "match with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(match.get());
    }

    @GetMapping("/matches/{id}/events")
    public ResponseEntity<?> getMatchEventsById(@PathVariable Integer id)
    {
        Optional<Match> match = matchService.findById(id);
        if(match.isEmpty())
        {
            String errorMessage = "match with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }

        Comparator<Event> eventComparator = (event1, event2) -> {
            int time1 = eventService.getTime(event1.getEventDetail());
            int time2 = eventService.getTime(event2.getEventDetail());
            return Integer.compare(time1, time2);
        };

        List<Event> events = match.get().getEvents();
        List<Event> sortedEvents = new ArrayList<>(events);
        Collections.sort(events, eventComparator);
        return ResponseEntity.ok(match.get().getEvents());
    }

    @GetMapping("/matches/{id}/events/{teamId}/desiredminute/{desiredMinute}")
    public ResponseEntity<?> getMatchEventsByDesiredMinuteByMatchId(@PathVariable Integer id,
                                                                    @PathVariable Integer teamId,
                                                                    @PathVariable Integer desiredMinute)
    {
        Optional<Match> match = matchService.findById(id);
        if(match.isEmpty())
        {
            String errorMessage = "match with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
       return ResponseEntity.ok(matchService.getMatchEventsByDesiredMinuteByMatchId(id, teamId, desiredMinute));
    }
}
