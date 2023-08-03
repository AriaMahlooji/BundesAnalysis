package com.api.bundes.dao;

import com.api.bundes.Entity.TeamImage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeamImageRepository extends MongoRepository<TeamImage, String> {
    Optional<TeamImage> findByName(String name);
}
