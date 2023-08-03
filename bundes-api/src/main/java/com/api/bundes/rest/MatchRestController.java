package com.api.bundes.rest;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import com.api.bundes.dto.EventsResponse;
import com.api.bundes.dto.GoalEngagedPlayers;
import com.api.bundes.service.MatchService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class MatchRestController {

    private MatchService matchService;

    public MatchRestController(MatchService matchService) {
        this.matchService = matchService;
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
