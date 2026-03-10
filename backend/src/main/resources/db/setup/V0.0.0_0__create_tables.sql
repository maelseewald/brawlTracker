CREATE TABLE listed_players
(
    id  BIGSERIAL PRIMARY KEY,
    tag VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE player
(
    id                                       BIGSERIAL PRIMARY KEY,
    tag                                      VARCHAR(20)  NOT NULL REFERENCES listed_players (tag) ON DELETE CASCADE,
    name                                     VARCHAR(100) NOT NULL,
    trophies                                 INTEGER,
    highest_trophies                         INTEGER,
    exp_level                                INTEGER,
    exp_points                               INTEGER,
    total_prestige_level                     INTEGER,
    solo_victories                           INTEGER,
    duo_victories                            INTEGER,
    three_vs_three_victories                 INTEGER,
    best_robo_rumble_time                    INTEGER,
    best_time_as_big_brawler                 INTEGER,
    is_qualified_from_championship_challenge BOOLEAN,
    club_tag                                 VARCHAR(20),
    club_name                                VARCHAR(100),
    created_at                               TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
