package com.api.bundes.dto;

public class GoalEngagedPlayers {
    String scorerPlayer;
    String assistPlayer;
    Integer goalMinute;

    public GoalEngagedPlayers(String scorerPlayer, String assistPlayer, Integer goalMinute) {
        this.scorerPlayer = scorerPlayer;
        this.assistPlayer = assistPlayer;
        this.goalMinute = goalMinute;
    }

    public String getScorerPlayer() {
        return scorerPlayer;
    }

    public String getAssistPlayer() {
        return assistPlayer;
    }

    public Integer getGoalMinute() {
        return goalMinute;
    }
}
