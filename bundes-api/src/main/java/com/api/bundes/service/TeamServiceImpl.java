package com.api.bundes.service;

import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.dao.TeamRepository;
import com.api.bundes.dto.TeamMatchesResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
