package com.api.bundes.service;

import com.api.bundes.Entity.Team;
import com.api.bundes.dto.EventFilter;
import com.api.bundes.dto.EventsResponse;
import com.api.bundes.dto.TeamMatchesResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    Optional<Team> findById(Integer id);
    Optional<Team> findByName(String name);
    List<Team> findAll();
    TeamMatchesResponse getTeamMatches(Team team);

}
