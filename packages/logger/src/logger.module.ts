import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { Logger } from './logger';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '../../config/src/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
