package com.api.bundes.rest;

import com.api.bundes.Entity.*;
import com.api.bundes.dao.PlayerRepository;
import com.api.bundes.dao.TeamRepository;
import com.api.bundes.dto.PlayerFilter;
import com.api.bundes.dto.PlayerImageDTO;
import com.api.bundes.service.PlayerImageService;
import com.api.bundes.service.PlayerService;
import com.api.bundes.service.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class PlayerRestController {
    private PlayerService playerService;
    private TeamService teamService;
    private TeamRepository teamRepository;
    private PlayerRepository playerRepository;

    private PlayerImageService playerImageService;

    public PlayerRestController(PlayerService playerService,
                                TeamService teamService,
                                TeamRepository teamRepository, PlayerRepository playerRepository,
                                PlayerImageService playerImageService) {
        this.playerService = playerService;
        this.teamService = teamService;
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
        this.playerImageService = playerImageService;
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

    @PutMapping("/players/image")
    public PlayerImageDTO getPlayerImage(@RequestBody PlayerFilter playerFilter)
    {

       String playerFullName = playerService.getFullNameOutOfAbbreviatedName(playerFilter);
       if(playerFullName==null)
        {
            return new PlayerImageDTO("", "", playerFilter.getAbbreviatedName());
        }
       else
       {
           System.out.println(playerFullName.concat(".jpg"));
           Optional<PlayerImage> playerImage = playerImageService.findByName(playerFullName.concat(".jpg"));
           if(!playerImage.isEmpty())
           {
               return new PlayerImageDTO(Base64.getEncoder().encodeToString(playerImage.get().getImage()), playerFullName, playerFilter.getAbbreviatedName());
           }
           return new PlayerImageDTO("", playerFullName, playerFilter.getAbbreviatedName());
       }
    }

    @GetMapping("/players/{name}/image")
    public PlayerImageDTO getPlayerImageByFullName(@PathVariable String name)
    {
        Optional<PlayerImage> playerImage = playerImageService.findByName(name.concat(".jpg"));
        if(!playerImage.isEmpty())
        {
            return new PlayerImageDTO(Base64.getEncoder().encodeToString(playerImage.get().getImage()), name, "");
        }
        return new PlayerImageDTO("", name, "");
    }

}
