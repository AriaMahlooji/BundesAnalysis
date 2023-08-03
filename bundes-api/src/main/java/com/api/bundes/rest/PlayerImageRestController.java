package com.api.bundes.rest;

import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.service.PlayerImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PlayerImageRestController {
    private PlayerImageService playerImageService;

    public PlayerImageRestController(PlayerImageService playerImageService) {
        this.playerImageService = playerImageService;
    }

    @GetMapping("/playerimages/{name}")
    public ResponseEntity<?> getPlayerImageByName(@PathVariable String name)
    {
        name = name + ".jpg";
        Optional<PlayerImage> playerImage = playerImageService.findByName(name);
        if(playerImage.isEmpty())
        {
            String errorMessage = "Player image with name " + name + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(playerImage.get());
    }
}