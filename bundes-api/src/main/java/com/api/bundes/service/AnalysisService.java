package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Team;
import com.api.bundes.dto.*;

import java.util.List;

public interface AnalysisService {
    Integer[] getEventDistribution(List<Event> events);
    EventsResponse getTeamEventsAgainst(Integer id, EventFilter eventFilter);
    EventsDistributionResponse getTeamEventsDistributionAgainst(Integer id, EventFilter eventFilter);
    List<SubstitutionEvaluation> getSortedSubstitutionsAgainst(Team team, EventFilter eventFilter,
                                                               Boolean ascending);
    List<SubstitutionEvaluation> paginateSortedSubstitutions(List<SubstitutionEvaluation> subs,
                                                             Integer pageSize, Integer pageNumber);
    List<TeamMatchesFinalResult> getLeagueStanding(List<String> seasons);


}
