package com.api.bundes.dto;

import com.api.bundes.Entity.Team;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

public class TeamMatchesFinalResult {
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public Team team;
    public List<String> seasons;
    public int wonCount;
    public int lostCount;
    public int drawCount;
    public int scoredGoalsCount;
    public int receivedGoalsCount;
    public int points;

    public TeamMatchesFinalResult(Team team, List<String> seasons, int wonCount, int lostCount, int drawCount, int scoredGoalsCount, int receivedGoalsCount) {
        this.team = team;
        this.seasons = seasons;
        this.wonCount = wonCount;
        this.lostCount = lostCount;
        this.drawCount = drawCount;
        this.scoredGoalsCount = scoredGoalsCount;
        this.receivedGoalsCount = receivedGoalsCount;
        this.points = wonCount*3 + this.drawCount;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<String> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<String> seasons) {
        this.seasons = seasons;
    }

    public int getWonCount() {
        return wonCount;
    }

    public void setWonCount(int wonCount) {
        this.wonCount = wonCount;
    }

    public int getLostCount() {
        return lostCount;
    }

    public void setLostCount(int lostCount) {
        this.lostCount = lostCount;
    }

    public int getDrawCount() {
        return drawCount;
    }

    public void setDrawCount(int drawCount) {
        this.drawCount = drawCount;
    }

    public int getScoredGoalsCount() {
        return scoredGoalsCount;
    }

    public void setScoredGoalsCount(int scoredGoalsCount) {
        this.scoredGoalsCount = scoredGoalsCount;
    }

    public int getReceivedGoalsCount() {
        return receivedGoalsCount;
    }

    public void setReceivedGoalsCount(int receivedGoalsCount) {
        this.receivedGoalsCount = receivedGoalsCount;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
