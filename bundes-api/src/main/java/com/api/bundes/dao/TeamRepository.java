package com.api.bundes.dao;

import com.api.bundes.Entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Optional<Team> findByName(String name);
    @Override
    List<Team> findAll();
}
