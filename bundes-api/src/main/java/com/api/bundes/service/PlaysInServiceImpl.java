package com.api.bundes.service;

import com.api.bundes.Entity.PlaysIn;
import com.api.bundes.dao.PlaysInRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaysInServiceImpl implements PlaysInService{
    private final PlaysInRepository playsInRepository;

    public PlaysInServiceImpl(PlaysInRepository playsInRepository) {
        this.playsInRepository = playsInRepository;
    }

    @Override
    public Optional<PlaysIn> findById(Integer id) {
        return playsInRepository.findById(id);
    }

    @Override
    public List<PlaysIn> findByTeamId(Integer id) {
        return this.playsInRepository.findByTeamId(id);
    }

    @Override
    public List<PlaysIn> findByPlayerId(Integer id) {
        return this.playsInRepository.findByPlayerId(id);
    }
}
