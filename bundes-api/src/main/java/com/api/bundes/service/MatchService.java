package com.api.bundes.service;

import com.api.bundes.Entity.Match;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import com.api.bundes.dto.MatchResponse;
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

    List<Match> paginateMatches(List<Match> matches, Integer pageSize, Integer offset);
    List<MatchResponse> getMatchesTeamsLogos(List<Match> matches);
    List<Match> sortMatchesBasedOnDate(List<Match> matches);

    Boolean isPostponed(Match match);
    String getFinalStatusOfMatchFor(Integer teamId, Match match);

}
