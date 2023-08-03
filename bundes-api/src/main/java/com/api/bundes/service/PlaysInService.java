package com.api.bundes.service;

import com.api.bundes.Entity.PlaysIn;

import javax.swing.*;
import java.util.List;
import java.util.Optional;

public interface PlaysInService {

    public Optional<PlaysIn> findById(Integer id);
    public List<PlaysIn> findByTeamId(Integer id);
    public List<PlaysIn> findByPlayerId(Integer id);


}
