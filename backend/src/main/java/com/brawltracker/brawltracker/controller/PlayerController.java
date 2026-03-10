package com.brawltracker.brawltracker.controller;

import java.util.List;

import com.brawltracker.brawltracker.api.PlayerApi;
import com.brawltracker.brawltracker.api.model.PlayerDTO;
import com.brawltracker.brawltracker.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PlayerController implements PlayerApi {

    private final PlayerService playerService;

    @Override
    public ResponseEntity<List<PlayerDTO>> getDataByTag(String playerTag) {
        return ResponseEntity.ok(playerService.getAllDataOfOnePlayer(playerTag));
    }
}
