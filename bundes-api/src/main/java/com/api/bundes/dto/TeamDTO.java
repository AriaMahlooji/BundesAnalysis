package com.api.bundes.dto;

import ch.qos.logback.core.net.SyslogOutputStream;

public class TeamDTO {
    public String teamName;


    public TeamDTO(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
