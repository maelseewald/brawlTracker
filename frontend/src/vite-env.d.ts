/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Basis-URL des Backends (leer lassen → nginx/Vite-Proxy übernimmt /api-Routing) */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

