package com.api.bundes.service;

import com.api.bundes.Entity.TeamImage;
import com.api.bundes.dao.TeamImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeamImageServiceImpl implements TeamImageService{
    private final TeamImageRepository teamImageRepository;

    @Autowired
    public TeamImageServiceImpl(TeamImageRepository teamImageRepository) {
        this.teamImageRepository = teamImageRepository;
    }

    @Override
    public Optional<TeamImage> findById(String id) {
        return teamImageRepository.findById(id);
    }

    @Override
    public Optional<TeamImage> findByName(String name) {
        name=name.replace("-","'");
        name=name.replace("ö","ö");
        name=name.replace("ü","ü");
        return teamImageRepository.findByName(name);
    }

    @Override
    public TeamImage saveOrUpdate(TeamImage teamImage) {
       return this.teamImageRepository.saveOrUpdate(teamImage);
    }
}
