package com.api.bundes.service;

import com.api.bundes.Entity.PlayerImage;

import java.util.Optional;

public interface PlayerImageService {
    public Optional<PlayerImage> findById(String id);
    public Optional<PlayerImage> findByName(String name);
    PlayerImage saveOrUpdate(PlayerImage playerImage);
}
