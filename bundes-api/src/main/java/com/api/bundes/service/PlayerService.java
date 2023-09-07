package com.api.bundes.service;

import com.api.bundes.Entity.Player;
import com.api.bundes.dto.PlayerFilter;

import java.util.List;
import java.util.Optional;


public interface PlayerService {

    Optional<Player> findById(Integer id);

    Optional<Player> findByName(String name);
    List<Player> findAll();

    String getFullNameOutOfAbbreviatedName(PlayerFilter playerFilter);
}
