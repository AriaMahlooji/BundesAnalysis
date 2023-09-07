package com.api.bundes.dto;

public class PlayerFilter {

    private String abbreviatedName;
    private String season;
    private Integer teamId;

    public String getAbbreviatedName() {
        return abbreviatedName;
    }

    public void setAbbreviatedName(String abbreviatedName) {
        this.abbreviatedName = abbreviatedName;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public PlayerFilter(String abbreviatedName, String season, Integer teamId) {
        this.abbreviatedName = abbreviatedName;
        this.season = season;
        this.teamId = teamId;
    }
}
