declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      API_VERSION: string;
    }
  }
}
export {};
