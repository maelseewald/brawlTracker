# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 – Build
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# package.json zuerst kopieren (Dependency-Layer cachen)
COPY package.json package-lock.json ./
RUN npm ci

# Quellcode & Konfiguration kopieren
COPY . .

# OpenAPI-Client generieren und Vite-Build ausführen.
# VITE_API_BASE_URL bleibt leer → Browser nutzt same-origin /api (nginx-Routing)
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 – Serve
# Schlankes nginx-Image für statische Assets
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Nginx-Konfiguration für SPA (alle Routen → index.html)
COPY nginx/spa.conf /etc/nginx/conf.d/default.conf

# Build-Ausgabe in nginx-Webroot
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
