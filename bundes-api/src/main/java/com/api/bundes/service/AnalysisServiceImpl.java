package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.dao.TeamRepository;
import com.api.bundes.dto.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalysisServiceImpl implements AnalysisService {
    private final TeamRepository teamRepository;
    private MatchService matchService;
    private EventService eventService;


    public AnalysisServiceImpl(TeamRepository teamRepository, MatchService matchService, EventService eventService) {

        this.teamRepository = teamRepository;
        this.matchService = matchService;
        this.eventService = eventService;
    }

    @Override
    public Integer[] getEventDistribution(List<Event> events)
    {
        Integer[] eventsDistribution = {0,0,0,0,0,0};
        List<Integer> eventsMinutes = events.stream().map(Event::getMinute).collect(Collectors.toList());
        eventsMinutes.forEach(eventMinute ->{
            if (eventMinute == 0) {}
            else if (eventMinute == 90) eventsDistribution[5] +=1;
            else eventsDistribution[(int)Math.floor(eventMinute/15)] +=1;
        });
        return eventsDistribution;
    }

    @Override
    public EventsResponse getTeamEventsAgainst(Integer id, EventFilter eventFilter) {
        List<Integer> matchIds=(matchService.findMatchesAgainst(id, eventFilter.getOpponentsIds(),
                eventFilter.getSeasons())).stream().map(Match::getId).collect(Collectors.toList());

        List<Event> byEvents = eventService.findTeamByEvents(id, matchIds,
                eventFilter.getEventTitles());
        List<Event> onEvents = eventService.findTeamOnEvents(id, matchIds,
                eventFilter.getEventTitles());
        EventsResponse eventsResponse = new EventsResponse(byEvents, onEvents);
        return eventsResponse;
    }

    @Override
    public EventsDistributionResponse getTeamEventsDistributionAgainst(Integer id, EventFilter eventFilter) {
        EventsResponse eventsResponse = getTeamEventsAgainst(id, eventFilter);
        Integer[] byEventDistribution = getEventDistribution(eventsResponse.getByEvents());
        Integer[] onEventDistribution = getEventDistribution(eventsResponse.getOnEvents());

        EventsDistributionResponse eventsDistributionResponse = new EventsDistributionResponse(eventsResponse,
                byEventDistribution, onEventDistribution);
        return eventsDistributionResponse;
    }

    public Double calculateDecayEffect(Integer timeDifference, Boolean isSubstitutionInvolved)
    {
        Double decayFactor = 0.05;
        Double maxInvolvementFactor = 1.2;
        Double timeFactor = 1+ 1 / ((double) timeDifference + 1); // Inverse proportion to time difference
        Double involvementFactor = maxInvolvementFactor * timeFactor;
        involvementFactor = Math.max(1, involvementFactor);

        if (isSubstitutionInvolved)
        {
            Double evaluation = Math.exp(-decayFactor * timeDifference) * involvementFactor;
            return evaluation;
        }

        else
        {
            Double evaluation = Math.exp(-decayFactor * timeDifference);
            return evaluation;
        }
    }

    public List<Double> calculateEvaluationPositiveMetrics(Event substitutionEvent,
                                                     List<Event> afterSubstitutionScoredGoalEvents)
    {
        List<Double> positiveMetrics= new ArrayList<>();
        afterSubstitutionScoredGoalEvents.forEach(
                event ->positiveMetrics.add(this.calculateDecayEffect(
                        event.getMinute()-substitutionEvent.getMinute(),
                        event.isSubstitutionInvolvedInGoalEvent(substitutionEvent.
                                getSubstitutionInPlayer()))));
        return positiveMetrics;
    }

    public List<Double> calculateEvaluationNegativeMetrics(Event substitutionEvent,
                                                     List<Event> afterSubstitutionReceivedGoalEvents)
    {
        List<Double> negativeMetrics= new ArrayList<>();
        afterSubstitutionReceivedGoalEvents.forEach(
                event ->negativeMetrics.add(this.calculateDecayEffect(
                        event.getMinute()-substitutionEvent.getMinute(),
                        false)));
        return negativeMetrics;
    }

    public Double calculateOverallEvaluation(List<Double> positiveMetrics, List<Double> negativeMetrics)
    {
        Double overallEvaluation = (double)0;
        for (double positiveMetric : positiveMetrics) {
            overallEvaluation += positiveMetric;
        }

        for (double negativeMetric : negativeMetrics) {
            overallEvaluation -= negativeMetric;
        }
        return overallEvaluation;
    }

    public SubstitutionEvaluation evaluateSubstitutionEvent(Event substitutionEvent)
    {
        EventResponseForSpecificMinute eventResponseForSpecificMinute = this.matchService
                .getMatchEventsByDesiredMinuteByMatchId(substitutionEvent.getMatchId(),
                        substitutionEvent.getTeamId(),
                        substitutionEvent.getMinute());

        List<Event> scoredGoalsEventsAfterMinute = eventResponseForSpecificMinute
                .getAfterMinuteEventResponse()
                .getByEvents().stream().filter(ev-> ev.isAGoal()).collect(Collectors.toList());

        List<Event> receivedGoalsEventsAfterMinute = eventResponseForSpecificMinute
                .getAfterMinuteEventResponse()
                .getOnEvents().stream().filter(ev-> ev.isAGoal()).collect(Collectors.toList());

        List<Double> positiveMetrics = calculateEvaluationPositiveMetrics(substitutionEvent,scoredGoalsEventsAfterMinute);
        List<Double> negativeMetrics = calculateEvaluationNegativeMetrics(substitutionEvent,receivedGoalsEventsAfterMinute);

        Double overallEvaluation = calculateOverallEvaluation(positiveMetrics,negativeMetrics);

        return new SubstitutionEvaluation(substitutionEvent,
                overallEvaluation,
                positiveMetrics,
                negativeMetrics );
    }

    @Override
    public List<SubstitutionEvaluation> getSortedSubstitutionsAgainst(Team team, EventFilter eventFilter) {
        EventsResponse eventsResponse = getTeamEventsAgainst(team.getId(), eventFilter);
        List<Event> events =eventsResponse.getByEvents();
        List<SubstitutionEvaluation> substitutionEvaluations = events.stream().map(event ->
                evaluateSubstitutionEvent(event)).collect(Collectors.toList());
        Collections.sort(substitutionEvaluations,
                Comparator.comparingDouble(SubstitutionEvaluation::getEvaluationScore));
        return substitutionEvaluations;
    }


}
