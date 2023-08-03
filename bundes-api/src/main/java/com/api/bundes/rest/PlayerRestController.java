package com.api.bundes.rest;

import com.api.bundes.Entity.Player;
import com.api.bundes.Entity.Team;
import com.api.bundes.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PlayerRestController {
    private PlayerService playerService;

    public PlayerRestController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/players")
    public ResponseEntity<?> getAllPlayers()
    {

        List<Player> players = playerService.findAll();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/players/name/{name}")
    public ResponseEntity<?> getPlayerById(@PathVariable String name)
    {

        Optional<Player> player = playerService.findByName(name);
        if(player.isEmpty())
        {
            String errorMessage = "Player with name " + name + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(player.get());
    }

    @GetMapping("/players/name/{name}/playsins")
    public ResponseEntity<?> getPlayerPlaysInsByName(@PathVariable String name)
    {

        Optional<Player> player = playerService.findByName(name);
        if(player.isEmpty())
        {
            String errorMessage = "Player with name " + name + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(player.get().getPlaysIn());
    }
}
