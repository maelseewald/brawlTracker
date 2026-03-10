package com.brawltracker.brawltracker.service;

import com.brawltracker.brawltracker.entity.ListedPlayer;
import com.brawltracker.brawltracker.entity.Player;
import com.brawltracker.brawltracker.repository.ListedPlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListedPlayerService {

    private final ListedPlayerRepository listedPlayerRepository;

    private final BrawlApiService brawlApiService;

    private final PlayerService playerService;

    public void addPlayerTag(String playerTag) {
        Player player = brawlApiService.fetchPlayer(playerTag);
        if (player == null) {
            throw new IllegalArgumentException("Player does not exist");
        }
        ListedPlayer listedPlayer = new ListedPlayer();
        listedPlayer.setTag(playerTag);
        listedPlayerRepository.save(listedPlayer);

        player.setTag(listedPlayer);
        playerService.addPlayerVersionToDb(player);
    }
}
