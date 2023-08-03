package com.api.bundes.dao;

import com.api.bundes.Entity.Player;
import com.api.bundes.Entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Optional<Player> findById(Integer id);
    Optional<Player> findByName(String name);
    List<Player> findAll();
}
