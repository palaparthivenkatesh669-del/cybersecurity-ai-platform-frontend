declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_VERSION: string;
    NEXT_PUBLIC_AUTH_REDIRECT_URL: string;
    NEXT_PUBLIC_ENABLE_MOCK_API: string;
    NEXT_PUBLIC_ENABLE_AI_CHAT: string;
    NEXT_PUBLIC_ML_MODEL_VERSION: string;
    NEXT_PUBLIC_ANOMALY_DETECTION_THRESHOLD: string;
  }
}
