package com.api.bundes.dto;

import java.util.List;

public class MatchFilter {
    List<Integer> opponentsIds;
    List<String> seasons;

    public List<String> getSeasons() {
        return seasons;
    }
    public List<Integer> getOpponentsIds() {
        return opponentsIds;
    }
}
