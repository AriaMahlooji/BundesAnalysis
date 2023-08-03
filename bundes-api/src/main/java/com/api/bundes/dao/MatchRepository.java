package com.api.bundes.dao;

import com.api.bundes.Entity.Match;
import org.hibernate.engine.spi.Managed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    @Query("SELECT m FROM Match m WHERE m.homeTeamId = :teamId OR m.awayTeamId = :teamId")
    List<Match> findTeamMatchesById(@Param("teamId") Integer teamId);

    @Query("SELECT m FROM Match m WHERE m.season IN :seasons AND " +
            "((m.homeTeamId = :teamId1 AND m.awayTeamId IN :opponentIds) OR " +
            "(m.homeTeamId IN :opponentIds AND m.awayTeamId = :teamId1))")
    List<Match> findMatchesAgainst(@Param("teamId1") Integer teamId1,
                                   @Param("opponentIds") List<Integer> opponentIds,
                                   @Param("seasons") List<String> seasons);

}
