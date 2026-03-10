package com.brawltracker.brawltracker.repository;

import java.util.List;

import com.brawltracker.brawltracker.entity.ListedPlayer;
import com.brawltracker.brawltracker.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Number> {

    List<Player> findAllByTag(ListedPlayer listedPlayer);

}

