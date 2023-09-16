package com.api.bundes.dto;

public class TeamImageDTO {
    public String teamName;
    public byte[] teamImageUrl;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public byte[] getTeamImageUrl() {
        return teamImageUrl;
    }

    public void setTeamImageUrl(byte[] teamImageUrl) {
        this.teamImageUrl = teamImageUrl;
    }

    public TeamImageDTO(String teamName, byte[] teamImageUrl) {
        this.teamName = teamName;
        this.teamImageUrl = teamImageUrl;
    }
}
