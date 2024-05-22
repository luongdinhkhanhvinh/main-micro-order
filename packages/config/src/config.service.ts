import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDatabase, ConfigSwagger } from './config.interface';
import { DEFAULT_CONFIG } from './config.default';
import * as admin from 'firebase-admin';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {}

  public parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: parseInt(env.PORT!, 10),
      db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
      swagger: this.parseSwaggerConfig(env, DEFAULT_CONFIG.swagger),
      logLevel: env.LOG_LEVEL!,
      auth: {
        expiresIn: Number(env.TOKEN_EXPIRY),
        access_token_secret: env.JWT_ACCESS_TOKEN_SECRET!,
        refresh_token_secret: env.JWT_REFRESH_TOKEN_SECRET!,
      },
      firebase: {
        credential: admin.credential.cert({
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          projectId: process.env.FIREBASE_PROJECT_ID,
        } as Partial<admin.ServiceAccount>),
      },
    };
  }

  private parseDBConfig(env: NodeJS.ProcessEnv, defaultConfig: Readonly<ConfigDatabase>) {
    return {
      url: env.DATABASE_URL || defaultConfig.url,
    };
  }

  private parseSwaggerConfig(env: NodeJS.ProcessEnv, defaultConfig: Readonly<ConfigSwagger>) {
    return {
      username: env.SWAGGER_USERNAME || defaultConfig.username,
      password: env.SWAGGER_PASSWORD || defaultConfig.password,
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
