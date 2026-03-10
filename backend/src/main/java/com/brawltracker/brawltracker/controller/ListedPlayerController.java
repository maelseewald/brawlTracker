package com.brawltracker.brawltracker.controller;

import com.brawltracker.brawltracker.api.PlayerlistApi;
import com.brawltracker.brawltracker.service.ListedPlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ListedPlayerController implements PlayerlistApi {

    private final ListedPlayerService listedPlayerService;

    @Override
    public ResponseEntity<Void> addPlayerTag(String playerTag) {
        listedPlayerService.addPlayerTag(playerTag);
        return ResponseEntity.ok().build();
    }
}
