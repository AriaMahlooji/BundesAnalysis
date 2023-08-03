package com.api.bundes.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "season")
    private String season;

    @Column(name = "date")
    private String date;

    @Column(name = "match_number")
    private String matchNumber;

    @Column(name = "home_team_id")
    private Integer homeTeamId;

    @Column(name = "away_team_id")
    private Integer awayTeamId;

    @Column(name = "home_team_score")
    private String homeTeamScore;

    @Column(name = "away_team_score")
    private String awayTeamScore;

    @OneToMany(mappedBy = "match", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Event> events;

    public Integer getId() {
        return id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_team_id", insertable = false, updatable = false)
    @JsonIgnore
    private Team homeTeam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "away_team_id", insertable = false, updatable = false)
    @JsonIgnore
    private Team awayTeam;


    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMatchNumber() {
        return matchNumber;
    }

    public void setMatchNumber(String matchNumber) {
        this.matchNumber = matchNumber;
    }

    public Integer getHomeTeamId() {
        return homeTeamId;
    }

    public void setHomeTeamId(Integer homeTeamId) {
        this.homeTeamId = homeTeamId;
    }

    public Integer getAwayTeamId() {
        return awayTeamId;
    }

    public void setAwayTeamId(Integer awayTeamId) {
        this.awayTeamId = awayTeamId;
    }

    public String getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(String homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }

    public String getAwayTeamScore() {
        return awayTeamScore;
    }

    public void setAwayTeamScore(String awayTeamScore) {
        this.awayTeamScore = awayTeamScore;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }
}
