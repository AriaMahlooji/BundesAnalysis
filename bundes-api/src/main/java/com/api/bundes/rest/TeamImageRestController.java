package com.api.bundes.rest;

import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.Entity.TeamImage;
import com.api.bundes.dao.TeamRepository;
import com.api.bundes.dto.TeamImageRequest;
import com.api.bundes.service.TeamImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamImageRestController {
    private TeamImageService teamImageService;

    public TeamImageRestController(TeamImageService teamImageService) {
        this.teamImageService = teamImageService;
    }

    @GetMapping("/teamimages/{name}")
    public ResponseEntity<?> getPlayerImageByName(@PathVariable String name)
    {

        Optional<TeamImage> teamImage = teamImageService.findByName(name);
        if(teamImage.isEmpty())
        {
            String errorMessage = "Player image with name " + name + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(teamImage.get());
    }

    @PostMapping("/teamimages/upload")
    public ResponseEntity<?> uploadTeamLogo(@RequestBody TeamImageRequest teamImageRequest)
    {
        // Check if the uploaded file is not empty
        if (teamImageRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Image file is empty.");
        }

        // Read the bytes of the uploaded image
        byte[] imageData = Base64.getDecoder().decode(teamImageRequest.getImage());

        // Create a new PlayerImage entity
        TeamImage teamImage = new TeamImage();
        teamImage.setName(teamImageRequest.getName());
        teamImage.setImage(imageData);

        // Save or update the PlayerImage entity
        teamImageService.saveOrUpdate(teamImage);

        return ResponseEntity.ok("Player image uploaded successfully.");
    }
}
