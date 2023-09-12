package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.dto.GoalEngagedPlayers;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventService {
    public List<Event> getAllEvents();
    public List<Event> findByTeamId(Integer id);
    public List<Event> findByMatchId(Integer id);
    List<Event> findTeamByEvents(@Param("teamId") Integer teamId, List<Integer> matchIds,List<String> eventTitles);
    List<Event> findTeamOnEvents(@Param("teamId") Integer teamId, List<Integer> matchIds, List<String> eventTitles);
    List<GoalEngagedPlayers> getGoalEngagedPlayers(List<Event> events);
    Integer getTime(String eventDetail);
    List<Event> paginateEvents(List<Event> events, Integer pageSize, Integer pageNumber);

}
