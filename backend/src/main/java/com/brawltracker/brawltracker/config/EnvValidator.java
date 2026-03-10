package com.brawltracker.brawltracker.config;

import jakarta.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Validiert beim Start, dass alle erforderlichen Umgebungsvariablen gesetzt sind.
 * Fehlt eine Variable, wird die Anwendung mit einer klaren Fehlermeldung beendet.
 */
@Component
public class EnvValidator {

    private static final Logger log = LoggerFactory.getLogger(EnvValidator.class);
    @Value("${spring.datasource.url}")
    private String datasourceUrl;
    @Value("${spring.datasource.username}")
    private String datasourceUsername;
    @Value("${spring.datasource.password}")
    private String datasourcePassword;
    @Value("${brawl.api.key}")
    private String brawlApiKey;

    @PostConstruct
    public void validate() {
        boolean valid = true;

        if (isBlank(datasourceUrl)) {
            log.error("FEHLER: Umgebungsvariable SPRING_DATASOURCE_URL ist nicht gesetzt.");
            valid = false;
        }
        if (isBlank(datasourceUsername)) {
            log.error("FEHLER: Umgebungsvariable SPRING_DATASOURCE_USERNAME ist nicht gesetzt.");
            valid = false;
        }
        if (isBlank(datasourcePassword)) {
            log.error("FEHLER: Umgebungsvariable SPRING_DATASOURCE_PASSWORD ist nicht gesetzt.");
            valid = false;
        }
        if (isBlank(brawlApiKey) || brawlApiKey.equals("your-brawl-stars-api-key-here")) {
            log.error(
                    "FEHLER: Umgebungsvariable BRAWL_API_KEY ist nicht gesetzt oder enthält noch den Platzhalterwert.");
            valid = false;
        }

        if (!valid) {
            log.error("=============================================================");
            log.error("  Anwendung wird beendet: Pflicht-Umgebungsvariablen fehlen.");
            log.error("  Bitte .env-Datei prüfen und alle Variablen konfigurieren.");
            log.error("=============================================================");
            throw new IllegalStateException("Pflicht-Umgebungsvariablen fehlen. Details im Log oben.");
        }

        log.info("Umgebungsvariablen-Validierung erfolgreich.");
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
