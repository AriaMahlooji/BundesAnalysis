package com.api.bundes.dto;

import com.api.bundes.Entity.Event;

import java.util.List;

public class EventResponseForSpecificMinute {
    EventsResponse beforeMinuteEventResponse;
    EventsResponse afterMinuteEventResponse;

    public EventResponseForSpecificMinute(List<Event> beforeMinuteByEvents,
                                          List<Event> afterMinuteByEvents,
                                          List<Event> beforeMinuteOnEvents,
                                          List<Event> afterMinuteOnEvents) {
        this.beforeMinuteEventResponse= new EventsResponse(beforeMinuteByEvents, beforeMinuteOnEvents);
        this.afterMinuteEventResponse = new EventsResponse(afterMinuteByEvents, afterMinuteOnEvents);
    }

    public EventsResponse getBeforeMinuteEventResponse() {
        return beforeMinuteEventResponse;
    }

    public EventsResponse getAfterMinuteEventResponse() {
        return afterMinuteEventResponse;
    }

}
