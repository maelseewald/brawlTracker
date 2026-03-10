package com.brawltracker.brawltracker.service;

import java.util.List;

import com.brawltracker.brawltracker.api.model.PlayerDTO;
import com.brawltracker.brawltracker.entity.ListedPlayer;
import com.brawltracker.brawltracker.entity.Player;
import com.brawltracker.brawltracker.mapper.PlayerMapper;
import com.brawltracker.brawltracker.repository.ListedPlayerRepository;
import com.brawltracker.brawltracker.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final ListedPlayerRepository listedPlayerRepository;

    private final BrawlApiService brawlApiService;

    private final PlayerRepository playerRepository;

    private final PlayerMapper playerMapper;

    public void addPlayerVersionToDb(Player player) {
        playerRepository.save(player);
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Europe/Zurich")
    public void updatePlayersAtMidnight() {
        List<String> tags = listedPlayerRepository.findAll().stream().map(ListedPlayer::getTag).toList();
        for (String tag : tags) {
            try {
                Player player = brawlApiService.fetchPlayer(tag);
                ListedPlayer listedPlayer = listedPlayerRepository.getListedPlayersByTag(tag);
                player.setTag(listedPlayer);
                addPlayerVersionToDb(player);
            } catch (Exception _) {
                // This is Okay
            }
        }
    }

    public List<PlayerDTO> getAllDataOfOnePlayer(String playerTag) {
        ListedPlayer listedPlayer = listedPlayerRepository.getListedPlayersByTag(playerTag);
        if (listedPlayer == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player not found: " + playerTag);
        }

        return playerRepository.findAllByTag(listedPlayer).stream().map(this::toPlayerDTO).toList();
    }

    public PlayerDTO toPlayerDTO(Player player) {
        return playerMapper.toPlayerDTO(player);
    }
}
