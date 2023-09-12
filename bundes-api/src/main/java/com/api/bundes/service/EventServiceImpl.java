package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.dao.EventRepository;
import com.api.bundes.dto.GoalEngagedPlayers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService{
    private final EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<Event> findByTeamId(Integer id) {
        return eventRepository.findByTeamId(id);
    }

    @Override
    public List<Event> findByMatchId(Integer id) {
        return eventRepository.findByMatchId(id);
    }

    @Override
    public List<Event> findTeamByEvents(Integer teamId, List<Integer> matchIds, List<String> eventTitles) {
        return eventRepository.findTeamByEvents(teamId, matchIds, eventTitles);
    }

    @Override
    public List<Event> findTeamOnEvents(Integer teamId, List<Integer> matchIds, List<String> eventTitles) {
        return eventRepository.findTeamOnEvents(teamId, matchIds, eventTitles);
    }

    @Override
    public List<GoalEngagedPlayers> getGoalEngagedPlayers(List<Event> events)
    {
        List<GoalEngagedPlayers> goalEngagedPlayers = new ArrayList<>();
        return events.stream().filter(event -> event.isAGoal()).collect(Collectors.toList()).stream().map(
                event -> event.getGoalEngagedPlayers()).collect(Collectors.toList());
    }

    @Override
    public Integer getTime(String eventDetail) {
        String[] parts = eventDetail.split("[^0-9]+");
        int time = Integer.parseInt(parts[0]);
        if (eventDetail.contains("+")) {
            for (int i = 1; i < parts.length - 1; i++) {
                if (parts[i].equals("w")) {
                    time += Integer.parseInt(parts[i + 1]);
                }
            }
        }
        return time;
    }

    @Override
    public List<Event> paginateEvents(List<Event> events, Integer pageSize, Integer pageNumber) {
            if(pageSize > events.size())
            {
                pageSize = events.size();
            }
            return events.subList((pageNumber-1)*pageSize, Math.min(pageNumber*pageSize, events.size()));

    }
}


