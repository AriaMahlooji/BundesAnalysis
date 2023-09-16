package com.api.bundes.service;

import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.dao.PlayerImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerImageServiceImpl implements PlayerImageService{

    @Autowired
    private final PlayerImageRepository playerImageRepository;

    public PlayerImageServiceImpl(PlayerImageRepository playerImageRepository) {
        this.playerImageRepository = playerImageRepository;
    }

    @Override
    public Optional<PlayerImage> findByName(String name) {
        return Optional.ofNullable(playerImageRepository.findByName(name).orElse(null));
    }

    @Override
    public Optional<PlayerImage> findById(String id) {
        return Optional.ofNullable(playerImageRepository.findById(id).orElse(null));
    }

    @Override
    public PlayerImage saveOrUpdate(PlayerImage playerImage) {
        return this.playerImageRepository.saveOrUpdate(playerImage);
    }
}
