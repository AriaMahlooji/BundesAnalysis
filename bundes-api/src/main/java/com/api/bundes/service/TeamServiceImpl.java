package com.api.bundes.service;

import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.dao.TeamRepository;
import com.api.bundes.dto.TeamMatchesFinalResult;
import com.api.bundes.dto.TeamMatchesResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;


    public TeamServiceImpl(TeamRepository teamRepository) {

        this.teamRepository = teamRepository;
    }

    @Override
    public Optional<Team> findById(Integer id) {
        return teamRepository.findById(id);
    }

    @Override
    public Optional<Team> findByName(String name) {
        return teamRepository.findByName(name);
    }

    @Override
    public List<Team> findAll() {
        return teamRepository.findAll();
    }

    @Override
    public TeamMatchesResponse getTeamMatches(Team team) {

        List<Match> homeMatches = team.getHomeMatches();
        List<Match> awayMatches = team.getAwayMatches();
        return new TeamMatchesResponse(homeMatches, awayMatches);
    }

    @Override
    public TeamMatchesFinalResult getTeamMathesFinalResult(List<Match> matches, Team team) {
        int wonCount=0;
        int drawCount=0;
        int lostCount=0;
        int scoredGoals = 0;
        int receivedGoals =0;

        for(Match match:matches){
            if(match.getHomeTeamId() == team.getId())
            {
                scoredGoals += Integer.parseInt(match.getHomeTeamScore());
                receivedGoals += Integer.parseInt(match.getAwayTeamScore());
                if(Integer.parseInt(match.getHomeTeamScore())> Integer.parseInt(match.getAwayTeamScore()))
                    wonCount +=1;
                if(Integer.parseInt(match.getHomeTeamScore())== Integer.parseInt(match.getAwayTeamScore()))
                    drawCount +=1;
                if(Integer.parseInt(match.getHomeTeamScore())< Integer.parseInt(match.getAwayTeamScore()))
                    lostCount +=1;

            }
            else
            {
                scoredGoals += Integer.parseInt(match.getAwayTeamScore());
                receivedGoals += Integer.parseInt(match.getHomeTeamScore());
                if(Integer.parseInt(match.getHomeTeamScore())< Integer.parseInt(match.getAwayTeamScore()))
                    wonCount +=1;
                if(Integer.parseInt(match.getHomeTeamScore())== Integer.parseInt(match.getAwayTeamScore()))
                    drawCount +=1;
                if(Integer.parseInt(match.getHomeTeamScore())> Integer.parseInt(match.getAwayTeamScore()))
                    lostCount +=1;
            }
        }
        List<String> seasons =  new HashSet<>(matches.stream().map(match -> match.getSeason()).toList()).stream().toList();
        return new TeamMatchesFinalResult(team, seasons, wonCount, lostCount, drawCount, scoredGoals, receivedGoals);
    }
}
