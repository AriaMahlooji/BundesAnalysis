package com.api.bundes.Entity;

import com.api.bundes.dto.GoalEngagedPlayers;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.Arrays;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "match_id")
    private Integer matchId;
    @Column(name = "season")
    private String season;

    @Column(name = "round_number")
    private String roundNumber;

    @Column(name = "match_number")
    private String matchNumber;

    @Column(name = "team_id")
    private Integer teamId;

    @Column(name = "title")
    private String title;

    @Column(name = "event_detail")
    private String eventDetail;

    @Column(name = "typ")
    private String typ;

    @ManyToOne
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    @JsonIgnore
    private Team team;

    @ManyToOne
    @JoinColumn(name = "match_id", insertable = false, updatable = false)
    @JsonIgnore
    private Match match;

    public Integer getId() {
        return id;
    }


    public Integer getMatchId() {
        return matchId;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(String roundNumber) {
        this.roundNumber = roundNumber;
    }

    public String getMatchNumber() {
        return matchNumber;
    }

    public void setMatchNumber(String matchNumber) {
        this.matchNumber = matchNumber;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEventDetail() {
        return eventDetail;
    }

    public void setEventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
    }

    public String getTyp() {
        return typ;
    }

    public void setTyp(String typ) {
        this.typ = typ;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @JsonIgnore
    public int getMinute() {
        if (eventDetail != null && !eventDetail.isEmpty()) {

                String minutePart = eventDetail.split("\n")[0].split("\'")[0];
                if (minutePart.matches("\\d+"))
                {
                    return Integer.parseInt(minutePart);
                }

        }
        System.out.println("match "+this.matchId +" has event " + this.id + " with bad minute");
        return 0; // Default value if minute cannot be extracted or event_detail is null/empty
    }

    @JsonIgnore
    public boolean isAGoal()
    {
        if(Arrays.asList("Goal", "Penalty", "Own goal").contains(this.title ))
        {
            return  true;
        }
        else return false;
    }

    @JsonIgnore
    public boolean isAFoul()
    {
        if(Arrays.asList("2nd Yellow card (Red)","Yellow card","Red card").contains(this.title))
        {
            return  true;
        }
        else return false;
    }

    @JsonIgnore
    public boolean isASubstitution()
    {
        if(this.title.equals("Substitution"))
        {
            return  true;
        }
        else return false;
    }

    @JsonIgnore
    public GoalEngagedPlayers getGoalEngagedPlayers()
    {
        if(isAGoal())
        {
            String scorerPlayer = this.eventDetail.split("\\n")[2];
            String assistPlayer = "";
            if(this.eventDetail.contains("Assist"))
            {
                assistPlayer = this.eventDetail.split("\\nAssist: ")[1];
            }
            return new GoalEngagedPlayers(scorerPlayer, assistPlayer, this.getMinute());
        }
        else
        {
            return new GoalEngagedPlayers("","", 0);
        }
    }
    @JsonIgnore
    public String getPlayerNameAbbreviation(String name) {
        if (name.split(" ").length == 1) {
            return name;
        }

        StringBuilder abbreviatedName = new StringBuilder();
        String[] nameParts = name.split(" ");

        for (int i = 0; i < nameParts.length; i++) {
            if (i != nameParts.length - 1) {
                abbreviatedName.append(nameParts[i].charAt(0)).append(". ");
            } else {
                abbreviatedName.append(nameParts[i]);
            }
        }

        return abbreviatedName.toString();
    }
    @JsonIgnore
    public Boolean isSubstitutionInvolvedInGoalEvent(String inPlayer)
    {
        String scoredPlayerAbbreviation = this.getPlayerNameAbbreviation(
                this.getGoalEngagedPlayers().getScorerPlayer());

        String assistPlayer = this.getPlayerNameAbbreviation(
                this.getGoalEngagedPlayers().getAssistPlayer());

        if(inPlayer.equals(scoredPlayerAbbreviation) || inPlayer.equals((assistPlayer)))
        {
            return true;
        }
        else return false;
    }

    @JsonIgnore
    public String getSubstitutionInPlayer()
    {
        if (!this.isASubstitution()) return "";
        else
        {
            String inPlayer = this.eventDetail.split("\\nIn: ")[1].split("\\nOut")[0];
            return inPlayer;
            // pay attention that inPlayer is in abbreviation form;
        }
    }

    //Inorder to get the Id of team that this event is occurred against.
    public Integer getEventTeamOpponentId()
    {
        if(typ.equals("home"))
        {
            return match.getAwayTeamId();
        }
        else return match.getHomeTeamId();
    }
}
