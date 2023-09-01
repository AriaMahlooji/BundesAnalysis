package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.Entity.TeamImage;
import com.api.bundes.dao.MatchRepository;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import com.api.bundes.dto.MatchResponse;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;
    private final TeamImageService teamImageService;

    public MatchServiceImpl(MatchRepository matchRepository, TeamImageService teamImageService)
    {
        this.teamImageService = teamImageService;
        this.matchRepository = matchRepository;
    }

    @Override
    public Optional<Match> findById(Integer id) {
        return matchRepository.findById(id);
    }

    @Override
    public List<Match> findAll() {
        return matchRepository.findAll();
    }

    @Override
    public List<Match> findTeamMatches(Integer id) {
        return matchRepository.findTeamMatchesById(id);
    }

    @Override
    public List<Match> findMatchesAgainst(Integer teamId, List<Integer> opponentsIds,
                                          List<String> seasons) {
        return matchRepository.findMatchesAgainst(teamId, opponentsIds, seasons);
    }

    @Override
    public EventResponseForSpecificMinute getMatchEventsByDesiredMinuteByMatchId(
            Integer id,
            Integer teamId,
            Integer desiredMinute) {
        Optional<Match> match = findById(id);
        List<Event> events =match.get().getEvents();
        List<Event> beforeMinuteByEvents = events.stream().filter(event ->
                        (event.getMinute()<desiredMinute && event.getTeamId() == teamId))
                .toList();
        List<Event> afterMinuteByEvents = events.stream().filter(event ->
                        (event.getMinute()>=desiredMinute && event.getTeamId() == teamId))
                .toList();
        List<Event> beforeMinuteOnEvents = events.stream().filter(event ->
                        (event.getMinute()<desiredMinute && event.getTeamId() != teamId))
                .toList();
        List<Event> afterMinuteOnEvents = events.stream().filter(event ->
                        (event.getMinute()>=desiredMinute && event.getTeamId() != teamId))
                .toList();
        EventResponseForSpecificMinute eventResponseForSpecificMinute = new EventResponseForSpecificMinute(
                beforeMinuteByEvents, afterMinuteByEvents, beforeMinuteOnEvents, afterMinuteOnEvents
        );
        return  eventResponseForSpecificMinute;
    }

    @Override
    public List<Match> paginateMatches(List<Match> matches, Integer pageSize, Integer pageNumber) {
        if(pageSize * pageNumber > matches.size())
        {
            pageNumber = 1;
        }
        return matches.subList((pageNumber-1)*pageSize, Math.min(pageNumber*pageSize, matches.size()));
    }

    @Override
    public List<MatchResponse> getMatchesTeamsLogos(List<Match> matches) {
        List<MatchResponse> matchesWithLogos = new ArrayList<>();
        matches.forEach(match ->{
            String homeTeamLogo="";
            String awayTeamLogo="";

            Optional<TeamImage> homeTeamImage = teamImageService.findByName(match.getHomeTeam().getName());
            Optional<TeamImage> awayTeamImage = teamImageService.findByName(match.getAwayTeam().getName());

            if(!homeTeamImage.isEmpty())
            {
                homeTeamLogo = Base64.getEncoder().encodeToString(homeTeamImage.get().getImage());
            }

            if(!awayTeamImage.isEmpty())
            {
                awayTeamLogo = Base64.getEncoder().encodeToString(awayTeamImage.get().getImage());
            }

            matchesWithLogos.add(new MatchResponse(match, homeTeamLogo, awayTeamLogo));
        });

        return matchesWithLogos;
    }

    @Override
    public List<Match> sortMatchesBasedOnDate(List<Match> matches) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy");
        List<Match> sortedMatches = matches.stream()
                .sorted(Comparator.comparing(match -> {
                    try {
                        return dateFormat.parse(match.getDate());
                    } catch (ParseException e) {
                        e.printStackTrace();
                        return null;
                    }
                }))
                .toList();
        return sortedMatches;
    }
}
