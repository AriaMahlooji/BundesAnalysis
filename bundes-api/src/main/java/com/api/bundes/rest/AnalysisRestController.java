package com.api.bundes.rest;

import com.api.bundes.Entity.Event;
import com.api.bundes.dto.SeasonFilter;
import com.api.bundes.dto.TeamMatchesFinalResult;
import com.api.bundes.service.AnalysisService;
import com.api.bundes.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisRestController {

    private AnalysisService analysisService;

    public AnalysisRestController(AnalysisService analysisService)
    {
        this.analysisService = analysisService;
    }
    @CrossOrigin
    @PutMapping("/standing")
    public List<TeamMatchesFinalResult> getStandings(@RequestBody SeasonFilter seasonFilter)
        {
            System.out.println("++++++++++++++++++++++++++++++++");
            System.out.println(seasonFilter.getSeasons());

            return analysisService.getLeagueStanding(seasonFilter.getSeasons());
        }
    }

