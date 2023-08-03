package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Team;
import com.api.bundes.dto.EventFilter;
import com.api.bundes.dto.EventsDistributionResponse;
import com.api.bundes.dto.EventsResponse;
import com.api.bundes.dto.SubstitutionEvaluation;

import java.util.List;

public interface AnalysisService {
    Integer[] getEventDistribution(List<Event> events);
    EventsResponse getTeamEventsAgainst(Integer id, EventFilter eventFilter);

    EventsDistributionResponse getTeamEventsDistributionAgainst(Integer id, EventFilter eventFilter);
    List<SubstitutionEvaluation> getSortedSubstitutionsAgainst(Team team, EventFilter eventFilter);

}
