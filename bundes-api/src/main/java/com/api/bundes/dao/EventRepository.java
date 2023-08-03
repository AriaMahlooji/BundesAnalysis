package com.api.bundes.dao;

import com.api.bundes.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findAll();
    List<Event> findByTeamId(Integer id);
    List<Event> findByMatchId(Integer id);


    @Query("SELECT e FROM Event e WHERE e.matchId IN :matchIds AND e.title IN :eventTitles AND" +
            " e.teamId = :teamId")
    List<Event> findTeamByEvents(@Param("teamId") Integer teamId, List<Integer> matchIds,
                                          @Param("eventTitles")List<String> eventTitles );

    @Query("SELECT e FROM Event e WHERE e.matchId IN :matchIds AND e.title IN :eventTitles AND" +
            " e.teamId != :teamId")
    List<Event> findTeamOnEvents(@Param("teamId") Integer teamId, List<Integer> matchIds,
                                            @Param("eventTitles")List<String> eventTitles);

}
