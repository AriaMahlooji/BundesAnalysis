package com.api.bundes.rest;

import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.dao.PlayerImageRepository;
import com.api.bundes.dto.PlayerImageRequest;
import com.api.bundes.service.PlayerImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerImageRestController {
    private PlayerImageService playerImageService;
    private PlayerImageRepository playerImageRepository;

    public PlayerImageRestController(PlayerImageService playerImageService,
                                     PlayerImageRepository playerImageRepository) {
        this.playerImageService = playerImageService;
        this.playerImageRepository = playerImageRepository;
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

    @PostMapping("playerimages/upload")
    public ResponseEntity<String> uploadPlayerImage(@RequestBody PlayerImageRequest request) {
        // Check if the uploaded file is not empty
        if (request.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Image file is empty.");
        }

        // Read the bytes of the uploaded image
        byte[] imageData = Base64.getDecoder().decode(request.getImage());

        // Create a new PlayerImage entity
        PlayerImage playerImage = new PlayerImage();
        playerImage.setName(request.getName());
        playerImage.setImage(imageData);

        // Save or update the PlayerImage entity
        playerImageRepository.saveOrUpdate(playerImage);

        return ResponseEntity.ok("Player image uploaded successfully.");
    }
}
