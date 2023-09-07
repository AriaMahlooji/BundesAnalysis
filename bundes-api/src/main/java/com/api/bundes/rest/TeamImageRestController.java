package com.api.bundes.rest;

import com.api.bundes.Entity.TeamImage;
import com.api.bundes.service.TeamImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
