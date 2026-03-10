package com.brawltracker.brawltracker.mapper;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import com.brawltracker.brawltracker.api.model.PlayerDTO;
import com.brawltracker.brawltracker.entity.Player;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    @Mapping(source = "tag.tag", target = "tag")
    PlayerDTO toPlayerDTO(Player player);

    default OffsetDateTime map(Instant instant) {
        return instant != null ? instant.atOffset(ZoneOffset.UTC) : null;
    }
}
