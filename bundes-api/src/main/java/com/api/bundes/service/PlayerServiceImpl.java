package com.api.bundes.service;

import com.api.bundes.Entity.Player;
import com.api.bundes.Entity.PlaysIn;
import com.api.bundes.Entity.Team;
import com.api.bundes.dao.PlayerRepository;
import com.api.bundes.dao.TeamRepository;
import com.api.bundes.dto.PlayerFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class PlayerServiceImpl implements PlayerService{
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    @Override
    public Optional<Player> findById(Integer id) {
        return playerRepository.findById(id);
    }

    public PlayerServiceImpl(PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public Optional<Player> findByName(String name) {
        return playerRepository.findByName(name);
    }

    @Override
    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    @Override
    public String getFullNameOutOfAbbreviatedName(PlayerFilter playerFilter) {
        Optional<Team> team = teamRepository.findById(playerFilter.getTeamId());
        String playerFullName = "";
        if(team.isEmpty())
        {
            return  null;
        }
        List<PlaysIn> teamPlayers = team.get().getPlaysIn().stream()
                .filter(playsIn -> playsIn.getSeason().equals(playerFilter.getSeason().replace("/","-"))).toList();

         List <PlaysIn> filteredPlayers =  teamPlayers.stream().filter(playsIn -> {
            Optional<Player> player =playerRepository.findById(playsIn.getPlayerId());
            return(!player.isEmpty() && player.get().getPlayerNameAbbreviation()
                    .equals(playerFilter.getAbbreviatedName()));}).toList();

         if(filteredPlayers.size()>0)
         {
             Optional<Player> player =playerRepository.findById(filteredPlayers.get(0).getPlayerId());
             return player.get().getName();
         }
         else return null;

    }
}
