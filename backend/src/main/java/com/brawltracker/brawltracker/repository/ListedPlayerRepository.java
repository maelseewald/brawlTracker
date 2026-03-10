package com.brawltracker.brawltracker.repository;

import com.brawltracker.brawltracker.entity.ListedPlayer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListedPlayerRepository extends JpaRepository<ListedPlayer, Number> {

    ListedPlayer getListedPlayersByTag(String tag);
}

