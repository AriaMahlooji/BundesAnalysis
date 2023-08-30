package com.api.bundes.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SeasonFilter {
    List<String> seasons;

    @JsonCreator
    public SeasonFilter(@JsonProperty("seasons") List<String> seasons) {
        this.seasons = seasons;
    }

    public List<String> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<String> seasons) {
        this.seasons = seasons;
    }
}
