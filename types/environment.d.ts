export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO: string;
      TOKEN_ACCESS_SECRET: string;
      MAIL_SERVER: string;
      PASSWORD_MAIL_SERVER: string;
      DOMAIN_APP: string;
      AES_KEY: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
