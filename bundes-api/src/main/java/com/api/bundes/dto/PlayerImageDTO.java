package com.api.bundes.dto;

public class PlayerImageDTO {
    private String playerImageUrl;
    private String playerFullName;
    private String playerAbbreviatedName;

    public PlayerImageDTO(String playerImageUrl, String playerFullName, String playerAbbreviatedName) {
        this.playerImageUrl = playerImageUrl;
        this.playerFullName = playerFullName;
        this.playerAbbreviatedName = playerAbbreviatedName;
    }

    public String getPlayerImageUrl() {
        return playerImageUrl;
    }

    public void setPlayerImageUrl(String playerImageUrl) {
        this.playerImageUrl = playerImageUrl;
    }

    public String getPlayerFullName() {
        return playerFullName;
    }

    public void setPlayerFullName(String playerFullName) {
        this.playerFullName = playerFullName;
    }

    public String getPlayerAbbreviatedName() {
        return playerAbbreviatedName;
    }

    public void setPlayerAbbreviatedName(String playerAbbreviatedName) {
        this.playerAbbreviatedName = playerAbbreviatedName;
    }
}
