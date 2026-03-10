# BrawlTracker

Track Brawl Stars player stats, trophies and progress over time.

**Stack:** React (Vite) · Spring Boot · PostgreSQL · nginx · Docker

---

## Architektur

```
Browser
  │
  ▼
nginx (Reverse Proxy)
  ├── deinedomain.de        → frontend-Container  (statische Vite-Assets)
  └── api.deinedomain.de   → backend-Container   (Spring Boot REST-API)
                                    │
                                    ▼
                             postgres-Container
                             (nur intern erreichbar)
```

**Sicherheitsprinzipien:**

- Das Frontend hat **keinen direkten Datenbankzugriff** – nur der Backend-Service spricht mit PostgreSQL.
- Datenbank-Credentials werden **nie** an das Frontend weitergegeben.
- Alle Secrets leben ausschließlich in `.env`-Dateien, die **nicht** ins Repository committed werden.

---

## Projektstruktur

```
brawltracker/
├── .env.example              # Vorlage für Root-Secrets (Produktion)
├── .env                      # Echte Secrets – NICHT committen
├── .gitignore
├── docker-compose.yml        # Produktions-Stack (4 Services)
├── docker-compose.dev.yml    # Lokales Entwicklungs-Override (DB-Port)
│
├── nginx/
│   └── nginx.conf            # Reverse Proxy Konfiguration
│
├── backend/
│   ├── .env.example          # Vorlage für Backend-Secrets
│   ├── .env                  # Echte Secrets – NICHT committen
│   ├── Dockerfile
│   └── src/main/
│       ├── resources/
│       │   └── application.yml   # Liest alle Secrets aus Env-Variablen
│       └── java/…/config/
│           └── EnvValidator.java # Prüft beim Start ob alle Variablen gesetzt sind
│
└── frontend/
    ├── .env.example          # Vorlage für Frontend-Env-Variablen
    ├── .env                  # Lokale Werte – NICHT committen
    ├── Dockerfile
    ├── nginx/
    │   └── spa.conf          # SPA-Konfiguration im Frontend-Container
    └── src/
        └── utils/
            ├── axiosSetup.ts # Liest VITE_API_BASE_URL
            └── apis.ts
```

---

## Lokale Entwicklung (ohne Docker)

### Voraussetzungen

- Java 25 (via [asdf](https://asdf-vm.com/) oder direkt)
- Node.js 22+
- Docker (für die Datenbank)

### 1. Repository klonen & Secrets anlegen

```sh
git clone <repo-url>
cd brawltracker

# Root-.env aus Vorlage erstellen und ausfüllen
cp .env.example .env

# Backend-.env aus Vorlage erstellen und ausfüllen
cp backend/.env.example backend/.env

# Frontend-.env aus Vorlage erstellen
cp frontend/.env.example frontend/.env
```

Folgende Werte in `.env` und `backend/.env` anpassen:

| Variable            | Beschreibung                                 |
|---------------------|----------------------------------------------|
| `POSTGRES_PASSWORD` | Sicheres DB-Passwort wählen                  |
| `BRAWL_API_KEY`     | API-Key von https://developer.brawlstars.com |

### 2. Datenbank starten

```sh
# Nur die PostgreSQL-Datenbank mit lokalem Port-Mapping starten
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d postgres
```

### 3. Backend starten

```sh
cd backend

# Umgebungsvariablen aus .env laden und Spring Boot starten
export $(grep -v '^#' .env | xargs)
./gradlew bootRun
```

Flyway-Migration läuft automatisch beim Start. Manuell ausführen:

```sh
export $(grep -v '^#' .env | xargs)
./gradlew flywayMigrate
```

### 4. Frontend starten

```sh
cd frontend
npm install
npm run dev   # Startet Vite Dev-Server auf Port 8905
```

Der Vite Dev-Server proxied `/api`-Anfragen automatisch an `http://localhost:29678` (konfiguriert via `DEV_BACKEND_URL` in `frontend/.env`).

---

## Produktion (Docker)

### 1. Secrets konfigurieren

```sh
cp .env.example .env
# Werte in .env eintragen (POSTGRES_PASSWORD, BRAWL_API_KEY, DOMAIN)
```

### 2. Domain in nginx.conf anpassen

```sh
# nginx/nginx.conf: "deinedomain.de" durch echte Domain ersetzen
```

### 3. Stack bauen und starten

```sh
docker compose up -d --build
```

### 4. Services prüfen

```sh
docker compose ps
docker compose logs backend --tail=50
docker compose logs nginx --tail=20
```

### 5. Stoppen

```sh
docker compose down          # Container stoppen (Daten bleiben erhalten)
docker compose down -v       # Container + Volumes löschen (DB-Daten verloren!)
```

---

## Umgebungsvariablen

### Root `.env` (Produktion)

| Variable            | Beschreibung          | Beispiel         |
|---------------------|-----------------------|------------------|
| `POSTGRES_DB`       | Datenbankname         | `brawltracker`   |
| `POSTGRES_USER`     | Datenbankbenutzer     | `postgres`       |
| `POSTGRES_PASSWORD` | **Sicheres** Passwort | `s3cr3t!`        |
| `BRAWL_API_KEY`     | Brawl Stars API-Key   | `eyJ0eX…`        |
| `DOMAIN`            | Domain ohne Protokoll | `deinedomain.de` |

### Backend `.env` (lokale Entwicklung)

| Variable                     | Beschreibung                      |
|------------------------------|-----------------------------------|
| `SPRING_DATASOURCE_URL`      | JDBC-URL der PostgreSQL-Datenbank |
| `SPRING_DATASOURCE_USERNAME` | DB-Benutzername                   |
| `SPRING_DATASOURCE_PASSWORD` | DB-Passwort                       |
| `BRAWL_API_KEY`              | Brawl Stars API-Key               |

### Frontend `.env` (lokale Entwicklung)

| Variable            | Beschreibung                                               |
|---------------------|------------------------------------------------------------|
| `VITE_API_BASE_URL` | Backend-URL für den Browser (leer = nginx/Proxy übernimmt) |
| `DEV_BACKEND_URL`   | Proxy-Target für Vite Dev-Server (nicht im Bundle)         |

---

## Sicherheitshinweise

- `.env`-Dateien sind in `.gitignore` eingetragen und werden **niemals** committed.
- `POSTGRES_PASSWORD` und `BRAWL_API_KEY` werden **nicht** an das Frontend weitergegeben.
- Der `EnvValidator` im Backend prüft beim Start, ob alle Pflicht-Variablen gesetzt sind.
- Die Datenbank ist im Docker-Stack **nicht nach außen** exponiert (kein Port-Mapping in Produktion).
- nginx-CORS-Header erlauben nur Anfragen von der eigenen Frontend-Domain.

---

## API-Dokumentation

Die OpenAPI-Spezifikation liegt unter `backend/openapi.yaml`. Im laufenden Backend ist Swagger UI erreichbar unter:

```
http://localhost:29678/swagger-ui.html
```

---

## Kontakt

- **Autor:** Mael Seewald
- **E-Mail:** maelseewald@gmx.net

