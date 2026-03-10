package com.brawltracker.brawltracker.entity;

import java.time.Instant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "player", schema = "brawltracker")
public class Player {

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;
    @Size(max = 100)
    @Column(name = "club_name", length = 100)
    private String clubName;
    @Size(max = 20)
    @Column(name = "club_tag", length = 20)
    private String clubTag;
    @Column(name = "is_qualified_from_championship_challenge")
    private Boolean isQualifiedFromChampionshipChallenge;
    @Column(name = "best_time_as_big_brawler")
    private Integer bestTimeAsBigBrawler;
    @Column(name = "best_robo_rumble_time")
    private Integer bestRoboRumbleTime;
    @Column(name = "three_vs_three_victories")
    private Integer threeVsThreeVictories;
    @Column(name = "duo_victories")
    private Integer duoVictories;
    @Column(name = "solo_victories")
    private Integer soloVictories;
    @Column(name = "total_prestige_level")
    private Integer totalPrestigeLevel;
    @Column(name = "exp_points")
    private Integer expPoints;
    @Column(name = "exp_level")
    private Integer expLevel;
    @Column(name = "highest_trophies")
    private Integer highestTrophies;
    @Column(name = "trophies")
    private Integer trophies;
    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tag", nullable = false, referencedColumnName = "tag")
    private ListedPlayer tag;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

}
