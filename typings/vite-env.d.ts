// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />
// eslint-disable-next-line spaced-comment
/// <reference types="electron-vite/node" />
// eslint-disable-next-line spaced-comment
/// <reference types="vite-svg-loader" />

interface ViteEnv {
  readonly MAIN_VITE_REQUEST_BASE_URL: string;
  MODE: 'development' | 'test' | 'preview' | 'production';
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv extends ViteEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string;
