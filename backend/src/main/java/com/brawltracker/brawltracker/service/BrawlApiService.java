package com.brawltracker.brawltracker.service;

import com.brawltracker.brawltracker.api.model.PlayerResponse;
import com.brawltracker.brawltracker.entity.ListedPlayer;
import com.brawltracker.brawltracker.entity.Player;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BrawlApiService {

    private final RestClient restClient;

    public BrawlApiService(@Value("${brawl.api.key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.brawlstars.com/v1")
                .defaultHeader("Authorization", "Bearer " +
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY5YWQyOTk0LWYxNTctNGY1OC1hODU1LWJiNWI3Yjg1YjBkNSIsImlhdCI6MTc3MjY1NDY4OSwic3ViIjoiZGV2ZWxvcGVyL2VlYzBhZDFlLWE2YTgtMTY1ZC1mZTQ5LTVhYzFhYWJiNWU0YyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTkzLjE5Mi4yMzUuMjQwIiwiMTQ1LjQwLjIxNC4yNTQiXSwidHlwZSI6ImNsaWVudCJ9XX0.D7Y2vXydlJdZszC0pIip1upuOLdiV3LaYCAQiA4eaHboN2BW8OIKlO43H2zAVs2gZVErz-0kcg4qA0VWhI7wxQ")
                .build();
    }

    public Player fetchPlayer(String tag) {
        String playerTag = "#" + tag;

        PlayerResponse dto = restClient.get().uri("/players/{tag}", playerTag).retrieve().body(PlayerResponse.class);

        if (dto == null) {
            throw new IllegalStateException("Brawl Stars API returned empty response for tag: " + tag);
        }

        return mapToEntity(dto);
    }

    public Player fetchPlayerAndAttachListedPlayer(String tag, ListedPlayer listedPlayer) {
        Player player = fetchPlayer(tag);
        player.setTag(listedPlayer);
        return player;
    }

    private Player mapToEntity(PlayerResponse dto) {
        Player player = new Player();

        // Simple fields
        player.setName(dto.getName());
        player.setTrophies(dto.getTrophies());
        player.setHighestTrophies(dto.getHighestTrophies());
        player.setExpLevel(dto.getExpLevel());
        player.setExpPoints(dto.getExpPoints());
        player.setTotalPrestigeLevel(dto.getTotalPrestigeLevel());
        player.setSoloVictories(dto.getSoloVictories());
        player.setDuoVictories(dto.getDuoVictories());
        player.setThreeVsThreeVictories(dto.get3vs3Victories());
        player.setBestRoboRumbleTime(dto.getBestRoboRumbleTime());
        player.setBestTimeAsBigBrawler(dto.getBestTimeAsBigBrawler());
        player.setIsQualifiedFromChampionshipChallenge(dto.getIsQualifiedFromChampionshipChallenge());

        if (dto.getClub() != null) {
            player.setClubTag(dto.getClub().getTag());
            player.setClubName(dto.getClub().getName());
        }

        return player;
    }
}
