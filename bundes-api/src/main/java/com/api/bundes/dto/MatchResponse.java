package com.api.bundes.dto;

import com.api.bundes.Entity.Match;

public class MatchResponse {
    private Match match;
    private String homeTeamLogo;
    private String awayTeamLogo;

    public MatchResponse(Match match, String homeTeamLogo, String awayTeamLogo) {
        this.match = match;
        this.homeTeamLogo = homeTeamLogo;
        this.awayTeamLogo = awayTeamLogo;
    }

    public String getHomeTeamLogo() {
        return homeTeamLogo;
    }

    public void setHomeTeamLogo(String homeTeamLogo) {
        this.homeTeamLogo = homeTeamLogo;
    }

    public String getAwayTeamLogo() {
        return awayTeamLogo;
    }

    public void setAwayTeamLogo(String awayTeamLogo) {
        this.awayTeamLogo = awayTeamLogo;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }
}
