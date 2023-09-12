package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.Team;
import com.api.bundes.Entity.TeamImage;
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
    private TeamService teamService;
    private TeamImageService teamImageService;


    public AnalysisServiceImpl(TeamRepository teamRepository,
                               MatchService matchService, EventService eventService,
                               TeamService teamService,
                               TeamImageService teamImageService) {

        this.teamRepository = teamRepository;
        this.matchService = matchService;
        this.eventService = eventService;
        this.teamService = teamService;
        this.teamImageService = teamImageService;

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
    public EventsResponse getTeamEventsAgainst(Integer id, EventFilter eventFilter, Integer pageSize, Integer pageNumber) {
        List<Integer> matchIds=(matchService.findMatchesAgainst(id, eventFilter.getOpponentsIds(),
                eventFilter.getSeasons())).stream().map(Match::getId).collect(Collectors.toList());

        List<Event> byEvents = eventService.findTeamByEvents(id, matchIds,
                eventFilter.getEventTitles());
        List<Event> paginatedByEvents = eventService.paginateEvents(byEvents, pageSize, pageNumber);

        List<Event> onEvents = eventService.findTeamOnEvents(id, matchIds,
                eventFilter.getEventTitles());
        List<Event> paginatedOnEvents = eventService.paginateEvents(onEvents, pageSize, pageNumber);

        if(eventFilter.getSide().equals("by")) {
            EventsResponse eventsResponse = new EventsResponse(paginatedByEvents);
            return eventsResponse;
        }
        if(eventFilter.getSide().equals("on")) {
            EventsResponse eventsResponse = new EventsResponse(paginatedOnEvents);
            return eventsResponse;
        }
        else{
            EventsResponse eventsResponse = new EventsResponse(byEvents, onEvents);
            return eventsResponse;
        }

    }

   /* @Override
    public EventsDistributionResponse getTeamEventsDistributionAgainst(Integer id, EventFilter eventFilter) {
        EventsResponse eventsResponse = getTeamEventsAgainst(id, eventFilter);
        Integer[] byEventDistribution = getEventDistribution(eventsResponse.getByEvents());
        Integer[] onEventDistribution = getEventDistribution(eventsResponse.getOnEvents());

        EventsDistributionResponse eventsDistributionResponse = new EventsDistributionResponse(eventsResponse,
                byEventDistribution, onEventDistribution);
        return eventsDistributionResponse;
    }*/

    @Override
    public EventsDistributionResponse getTeamEventsDistributionAgainst(Integer id, EventFilter eventFilter) {
        return null;
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

    /*
    @Override
    public List<SubstitutionEvaluation> getSortedSubstitutionsAgainst(Team team, EventFilter eventFilter) {
        EventsResponse eventsResponse = getTeamEventsAgainst(team.getId(), eventFilter);
        List<Event> events =eventsResponse.getByEvents();
        List<SubstitutionEvaluation> substitutionEvaluations = events.stream().map(event ->
                evaluateSubstitutionEvent(event)).collect(Collectors.toList());
        Collections.sort(substitutionEvaluations,
                Comparator.comparingDouble(SubstitutionEvaluation::getEvaluationScore));
        return substitutionEvaluations;
    }*/

    @Override
    public List<SubstitutionEvaluation> getSortedSubstitutionsAgainst(Team team, EventFilter eventFilter) {
        return null;
    }

    public List<Team> getTeamsForSeasons(List<String> seasons)
    {
        List<Match> matches = matchService.findAll();
        List<Match> filteredMatches = matches.stream()
                .filter(match -> seasons.contains(match.getSeason())).toList();

        List<Match> nonPostponedMatches = filteredMatches.stream().
                filter(match -> !match.getHomeTeamScore().equals("pp") &&
                        !match.getAwayTeamScore().equals("pp")).toList();

        List<Team> homeTeams = nonPostponedMatches.stream().map(match -> match.getHomeTeam()).toList();
        List<Team> awayTeams = nonPostponedMatches.stream().map(match -> match.getAwayTeam()).toList();
        List<Team> allInvolvedTeams = new ArrayList<>();

        for(Team team: homeTeams)
        {
            if(!allInvolvedTeams.stream().map(team1 -> team1.getId()).toList().contains(team.getId()))
            {
                allInvolvedTeams.add(team);
            }
        }

        for(Team team: awayTeams)
        {
            if(!allInvolvedTeams.stream().map(team1 -> team1.getId()).toList().contains(team.getId()))
            {
                allInvolvedTeams.add(team);
            }
        }
        return allInvolvedTeams;
    }

    public List<TeamMatchesFinalResult> setLeagueStandingTeamsLogos(List<TeamMatchesFinalResult> teamStandings)
    {
        teamStandings.forEach(team-> {
            String teamLogo="";
            String teamName = team.getTeam().getName();

            Optional<TeamImage> teamImage = teamImageService.findByName(team.getTeam().getName());
            if(!teamImage.isEmpty())
            {

                teamLogo = Base64.getEncoder().encodeToString(teamImage.get().getImage());
            }
            team.setTeamLogoUrl(teamLogo);
        });
        return teamStandings;
    }
    @Override
    public List<TeamMatchesFinalResult> getLeagueStanding(List<String> seasons) {
        List<TeamMatchesFinalResult> standingInfo = new ArrayList<>();
        List<Team> allInvolvedTeams = getTeamsForSeasons(seasons);

        for(Team team:allInvolvedTeams)
        {
            List<Match> matches = this.matchService.findTeamMatches(team.getId());
            List<Match> nonPostponedMatches = matches.stream().
                    filter(match -> !match.getHomeTeamScore().equals("pp") &&
                            !match.getAwayTeamScore().equals("pp")).toList();

            List<Match> matchesFilteredBySeason = nonPostponedMatches.stream()
                    .filter(match -> seasons.contains(match.getSeason())).toList();

            standingInfo.add(this.teamService.getTeamMathesFinalResult(matchesFilteredBySeason, team));
        }

        List<TeamMatchesFinalResult> sortedStandingInfo = standingInfo.stream()
                .sorted(Comparator.comparing(TeamMatchesFinalResult::getPoints).reversed()).toList();

        List<TeamMatchesFinalResult> sortedStandingInfoLogosIncluded =
                setLeagueStandingTeamsLogos(sortedStandingInfo);

        return sortedStandingInfoLogosIncluded;
    }
}
