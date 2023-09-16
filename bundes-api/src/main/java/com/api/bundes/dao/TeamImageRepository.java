package com.api.bundes.dao;

import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.Entity.TeamImage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeamImageRepository extends MongoRepository<TeamImage, String> {
    Optional<TeamImage> findByName(String name);
    default TeamImage saveOrUpdate(TeamImage teamImage)
    {
        Optional<TeamImage> existingImage = findByName(teamImage.getName());
        if (existingImage.isPresent()) {
            // Team Image with the same name exists, update it
            TeamImage existing = existingImage.get();
            existing.setImage(teamImage.getImage());
            return save(existing);
        } else {
            // Team Image with the given name does not exist, save it as a new entity
            return save(teamImage);
        }
    }
}
