package com.api.bundes.service;

import com.api.bundes.Entity.Event;
import com.api.bundes.Entity.Match;
import com.api.bundes.dao.MatchRepository;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;

    public MatchServiceImpl(MatchRepository matchRepository) {
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
}
