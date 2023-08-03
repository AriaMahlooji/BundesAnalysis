package com.api.bundes.service;

import com.api.bundes.Entity.Match;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import java.util.Optional;

public interface MatchService {
    Optional<Match> findById(Integer id);
    List<Match> findAll();
    List<Match> findTeamMatches(Integer id);
    List<Match> findMatchesAgainst(Integer teamId, List<Integer> opponentsIds, List<String> seasons);
    EventResponseForSpecificMinute getMatchEventsByDesiredMinuteByMatchId(Integer id,
                                                                          Integer teamId,
                                                                          Integer desiredMinute);

}
