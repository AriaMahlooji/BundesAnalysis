package com.api.bundes.dao;

import com.api.bundes.Entity.PlayerImage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PlayerImageRepository extends MongoRepository<PlayerImage, String> {
    Optional<PlayerImage> findByName(String name);

}
