package com.api.bundes.dao;

import com.api.bundes.Entity.PlayerImage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PlayerImageRepository extends MongoRepository<PlayerImage, String> {
    Optional<PlayerImage> findByName(String name);
    default PlayerImage saveOrUpdate(PlayerImage playerImage)
    {
        Optional<PlayerImage> existingImage = findByName(playerImage.getName());

        if (existingImage.isPresent()) {
            // PlayerImage with the same name exists, update it
            PlayerImage existing = existingImage.get();
            existing.setImage(playerImage.getImage());
            return save(existing);
        } else {
            // PlayerImage with the given name does not exist, save it as a new entity
            return save(playerImage);
        }
    }
}
