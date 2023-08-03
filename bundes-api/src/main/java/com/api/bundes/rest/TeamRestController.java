package com.api.bundes.rest;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.dto.EventFilter;
import com.api.bundes.dto.EventsDistributionResponse;
import com.api.bundes.dto.EventsResponse;
import com.api.bundes.dto.MatchFilter;
import com.api.bundes.service.AnalysisServiceImpl;
import com.api.bundes.service.EventService;
import com.api.bundes.service.MatchService;
import com.api.bundes.service.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class TeamRestController {
    private TeamService teamService;
    private MatchService matchService;
    private EventService eventService;
    private AnalysisServiceImpl analysisService;

    public TeamRestController(TeamService teamService, MatchService matchService, EventService eventService,
                              AnalysisServiceImpl analysisService) {
        this.teamService = teamService;
        this.matchService = matchService;
        this.eventService = eventService;
        this.analysisService = analysisService;
    }

    @GetMapping("/teams")
    public ResponseEntity<?> getAllTeams()
    {

        List<Team> teams = teamService.findAll();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/teams/{id}")
    public ResponseEntity<?> getTeamById(@PathVariable Integer id)
    {

        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(team.get());
    }


    @GetMapping("/teams/{id}/events")
    public ResponseEntity<?> getTeamEventsById(@PathVariable Integer id)
    {

        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(team.get().getEvents());
    }

    @GetMapping("/teams/{id}/matches")
    public ResponseEntity<?> getTeamMatchesById(@PathVariable Integer id)
    {

        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(matchService.findTeamMatches(id));

    }
    @GetMapping("/teams/{id}/matches/against")
    public ResponseEntity<?> getTeamMatchesAgainst(@PathVariable Integer id,
                                                   @RequestBody MatchFilter matchFilter)
    {

        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }

        return ResponseEntity.ok(matchService.findMatchesAgainst(id, matchFilter.getOpponentsIds(),
                                                                 matchFilter.getSeasons()));
    }
    @GetMapping("/teams/{id}/matches/against/events")
    public ResponseEntity<?> getTeamEventsAgainst(@PathVariable Integer id,
                                                   @RequestBody EventFilter eventFilter)
    {
        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(this.analysisService.getTeamEventsAgainst(id, eventFilter));
    }
    @GetMapping("/teams/{id}/matches/against/events/distribution")
    public ResponseEntity<?> getTeamEventsDistributionAgainst(@PathVariable Integer id,
                                                       @RequestBody EventFilter eventFilter)
    {
        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }

        return ResponseEntity.ok(analysisService.getTeamEventsDistributionAgainst(id, eventFilter));
    }
    @GetMapping("/teams/{id}/matches/{matchType}")
    public ResponseEntity<?> getTeamMatchesById(@PathVariable Integer id, @PathVariable String matchType)
    {

        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(teamService.getTeamMatches(team.get()));

    }

    @GetMapping("/teams/{id}/sortedsubstitutions")
    public ResponseEntity<?> getSortedSubstitutionsAgainst(@PathVariable Integer id,
                                                              @RequestBody EventFilter eventFilter)
    {
        eventFilter.setEventTitles(Arrays.asList("Substitution"));
        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }

        return ResponseEntity.ok(analysisService.getSortedSubstitutionsAgainst(team.get(), eventFilter));
    }



}
