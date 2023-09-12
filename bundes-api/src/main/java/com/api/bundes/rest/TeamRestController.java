package com.api.bundes.rest;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.Entity.TeamImage;
import com.api.bundes.dto.*;
import com.api.bundes.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamRestController {
    private TeamService teamService;
    private MatchService matchService;
    private EventService eventService;
    private AnalysisServiceImpl analysisService;
    private TeamImageService teamImageService;

    public TeamRestController(TeamService teamService, MatchService matchService, EventService eventService,
                              AnalysisServiceImpl analysisService, TeamImageService teamImageService) {
        this.teamService = teamService;
        this.matchService = matchService;
        this.eventService = eventService;
        this.analysisService = analysisService;
        this.teamImageService = teamImageService;
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

    @PutMapping("/teams/{id}/matches")
    public ResponseEntity<?> getTeamMatchesById(@PathVariable Integer id,
                                                @RequestParam(defaultValue = "0") Integer pageSize,
                                                @RequestParam(defaultValue = "20") Integer pageNumber,
                                                @RequestBody MatchFilter matchFilter)
    {

        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }

        List<Match> matches = matchService.findTeamMatches(id).stream()
                .filter(match -> matchFilter.getSeasons().contains(match.getSeason()) &&
                        matchFilter.getFinalStatus().contains(matchService.getFinalStatusOfMatchFor(id, match)))
                .toList();
        List<Match> sortedMatches = matchService.sortMatchesBasedOnDate(matches);
        List<Match> paginatedMatches = matchService.paginateMatches(sortedMatches, pageSize, pageNumber);

        return ResponseEntity.ok(matchService.getMatchesTeamsLogos(paginatedMatches));

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
    @PutMapping("/teams/{id}/matches/against/events")
    public ResponseEntity<?> getTeamEventsAgainst(@PathVariable Integer id,
                                                  @RequestParam(defaultValue = "0") Integer pageSize,
                                                  @RequestParam(defaultValue = "20") Integer pageNumber,
                                                   @RequestBody EventFilter eventFilter)
    {
        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            String errorMessage = "Team with id " + id + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(this.analysisService.getTeamEventsAgainst(id, eventFilter, pageSize, pageNumber));
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

    @GetMapping("/teams/{id}/getmatchesfinalresult")
    public ResponseEntity<?> getMatchesFinalResultInfo(@PathVariable Integer id)
    {
        Optional<Team> team = teamService.findById(id);
        List<Match> matches = matchService.findTeamMatches(team.get().getId()).stream().
                filter(match -> !match.getHomeTeamScore().equals("pp") && !match.getAwayTeamScore()
                        .equals("pp")).toList();
        return ResponseEntity.ok(teamService.getTeamMathesFinalResult(matches,team.get()));
    }

    @GetMapping("/teams/{id}/image")
    public ResponseEntity<?> getTeamImageById(@PathVariable Integer id)
    {
        Optional<Team> team = teamService.findById(id);
        if(team.isEmpty())
        {
            return null;
        }
        return ResponseEntity.ok(teamImageService.findByName(team.get().getName()));
    }
}
