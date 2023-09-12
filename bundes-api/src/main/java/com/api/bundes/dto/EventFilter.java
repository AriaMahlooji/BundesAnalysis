package com.api.bundes.dto;

import java.util.List;

public class EventFilter {
    List<Integer> opponentsIds;
    List<String> seasons;

    String side; //by, on, both.
    List<String> eventTitles;

    public EventFilter(List<Integer> opponentsIds, List<String> seasons, List<String> eventTitles, String side) {
        this.opponentsIds = opponentsIds;
        this.seasons = seasons;
        this.eventTitles = eventTitles;
        this.side = side;
    }

    public List<String> getSeasons() {
        return seasons;
    }
    public List<Integer> getOpponentsIds() {
        return opponentsIds;
    }
    public List<String> getEventTitles() {
        return eventTitles;
    }
    public void setEventTitles(List<String> eventTitles) {
        this.eventTitles = eventTitles;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }
}
