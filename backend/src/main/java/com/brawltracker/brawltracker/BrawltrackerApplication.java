package com.brawltracker.brawltracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BrawltrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(BrawltrackerApplication.class, args);
    }
}
