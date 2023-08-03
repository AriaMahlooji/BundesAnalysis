package com.api.bundes.dto;

import com.api.bundes.Entity.Event;

import java.util.List;

public class EventsResponse {
    private List<Event> byEvents; // events which belongs to team identified, by teamId
    private List<Event> onEvents; // events which belongs to the opponent of team, identified by teamId

    public EventsResponse(List<Event> byEvents, List<Event> onEvents) {
        this.byEvents = byEvents;
        this.onEvents = onEvents;
    }

    public List<Event> getByEvents() {
        return byEvents;
    }

    public void setByEvents(List<Event> byEvents) {
        this.byEvents = byEvents;
    }

    public List<Event> getOnEvents() {
        return onEvents;
    }

    public void setOnEvents(List<Event> onEvents) {
        this.onEvents = onEvents;
    }
}
