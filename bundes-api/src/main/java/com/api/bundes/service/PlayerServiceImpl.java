package com.api.bundes.service;

import com.api.bundes.Entity.Player;
import com.api.bundes.dao.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService{
    private final PlayerRepository playerRepository;

    @Override
    public Optional<Player> findById(Integer id) {
        return playerRepository.findById(id);
    }

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public Optional<Player> findByName(String name) {
        return playerRepository.findByName(name);
    }

    @Override
    public List<Player> findAll() {
        return playerRepository.findAll();
    }
}
