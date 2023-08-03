package com.api.bundes;

import com.api.bundes.Entity.PlayerImage;
import com.api.bundes.dao.PlayerImageRepository;
import com.api.bundes.dto.EventResponseForSpecificMinute;
import com.api.bundes.service.MatchService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BundesApplication {

	private final PlayerImageRepository playerImageRepository;
	MatchService matchService;
	public BundesApplication(PlayerImageRepository playerImageRepository,
							 MatchService matchService) {
		this.playerImageRepository = playerImageRepository;
		this.matchService = matchService;
	}


	public static void main(String[] args) {
		SpringApplication.run(BundesApplication.class, args);
	}

}
