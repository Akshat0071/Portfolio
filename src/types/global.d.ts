// Type definitions for Google Analytics
interface Window {
  gtag: (
    command: string,
    action: string,
    params?: Record<string, any>
  ) => void;
}

// Declare environment variables
interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_DESCRIPTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
