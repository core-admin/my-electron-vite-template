declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    ENV_MODE: 'development' | 'test' | 'preview' | 'production';
    platform: string;
    ELECTRON_RENDERER_URL?: string;
  }
}
