package com.api.bundes.dto;

import java.util.List;

public class EventsDistributionResponse {
    EventsResponse eventsResponse;
    Integer[] byEventsDistribution;
    Integer[] onEventsDistribution;

    public EventsResponse getEventsResponse() {
        return eventsResponse;
    }

    public void setEventsResponse(EventsResponse eventsResponse) {
        this.eventsResponse = eventsResponse;
    }

    public Integer[] getByEventsDistribution() {
        return byEventsDistribution;
    }

    public void setByEventsDistribution(Integer[] byEventsDistribution) {
        this.byEventsDistribution = byEventsDistribution;
    }

    public Integer[] getOnEventsDistribution() {
        return onEventsDistribution;
    }

    public void setOnEventsDistribution(Integer[] onEventsDistribution) {
        this.onEventsDistribution = onEventsDistribution;
    }

    public EventsDistributionResponse(EventsResponse eventsResponse,
                                      Integer[] byEventsDistribution,
                                      Integer[] onEventsDistribution) {
        this.eventsResponse = eventsResponse;
        this.byEventsDistribution = byEventsDistribution;
        this.onEventsDistribution = onEventsDistribution;
    }
}
