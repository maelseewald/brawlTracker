# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 – Build
# Verwendet Eclipse Temurin JDK 25 (entspricht dem Toolchain-Setting in build.gradle)
# ─────────────────────────────────────────────────────────────────────────────
FROM eclipse-temurin:25-jdk AS builder

WORKDIR /app

# Gradle-Wrapper und Build-Skripte zuerst kopieren (Layer-Cache nutzen)
COPY gradlew settings.gradle build.gradle gradle.properties ./
COPY gradle ./gradle

# Abhängigkeiten vorab herunterladen (Cache-Schicht)
RUN ./gradlew dependencies --no-daemon -q || true

# Quellcode kopieren und JAR bauen (Tests werden im CI separat ausgeführt)
COPY src ./src
RUN ./gradlew bootJar --no-daemon -x test -x flywayMigrate

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 – Runtime
# Schlankes JRE-Image ohne Build-Tools
# ─────────────────────────────────────────────────────────────────────────────
FROM eclipse-temurin:25-jre AS runtime

WORKDIR /app

# Nicht-root-Benutzer für mehr Sicherheit
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser

# JAR aus dem Builder-Stage kopieren
COPY --from=builder /app/build/libs/*.jar app.jar

# Datei-Eigentümer setzen
RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 29678

# SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD
# und BRAWL_API_KEY werden zur Laufzeit als Umgebungsvariablen erwartet.
ENTRYPOINT ["java", "-jar", "app.jar"]
