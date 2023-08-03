package com.api.bundes.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Event> events;

    @OneToMany(mappedBy = "homeTeam")
    @JsonIgnore
    private List<Match> homeMatches;

    @OneToMany(mappedBy = "awayTeam")
    @JsonIgnore
    private List<Match> awayMatches;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private List<PlaysIn> playsIn;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Match> getHomeMatches() {
        return homeMatches;
    }

    public void setHomeMatches(List<Match> homeMatches) {
        this.homeMatches = homeMatches;
    }

    public List<Match> getAwayMatches() {
        return awayMatches;
    }

    public void setAwayMatches(List<Match> awayMatches) {
        this.awayMatches = awayMatches;
    }

    public List<PlaysIn> getPlaysIn() {
        return playsIn;
    }

    public void setPlaysIn(List<PlaysIn> playsIn) {
        this.playsIn = playsIn;
    }
}
