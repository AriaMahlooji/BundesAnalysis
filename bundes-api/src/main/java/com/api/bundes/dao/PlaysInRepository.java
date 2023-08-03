package com.api.bundes.dao;

import com.api.bundes.Entity.PlaysIn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaysInRepository extends JpaRepository<PlaysIn, Integer> {

     Optional<PlaysIn> findById(Integer id);
     List<PlaysIn> findByTeamId(Integer id);
     List<PlaysIn> findByPlayerId(Integer id);

}
