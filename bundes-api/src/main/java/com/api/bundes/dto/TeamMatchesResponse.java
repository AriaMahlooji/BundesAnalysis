package com.api.bundes.dto;

import com.api.bundes.Entity.Match;

import java.util.List;

public class TeamMatchesResponse {
    List<Match> homeMatches;
    List<Match> awayMatches;

    public TeamMatchesResponse(List<Match> homeMatches, List<Match> awayMatches) {
        this.homeMatches = homeMatches;
        this.awayMatches = awayMatches;
    }

    public List<Match> getHomeMatches() {
        return homeMatches;
    }

    public List<Match> getAwayMatches() {
        return awayMatches;
    }
}
