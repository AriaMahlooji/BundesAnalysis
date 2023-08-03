package com.api.bundes.service;
import com.api.bundes.Entity.TeamImage;

import java.util.Optional;

public interface TeamImageService {
    public Optional<TeamImage> findById(String id);
    public Optional<TeamImage> findByName(String name);
}
