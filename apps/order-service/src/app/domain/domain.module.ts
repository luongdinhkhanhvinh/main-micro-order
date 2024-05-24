// domain.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from 'vi-auths';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order/entity/order.entity';
import { DBModule } from 'vi-databases';
import { TerminusModule } from '@nestjs/terminus';
import { AppLoggerModule } from 'vi-logger';
import { ConfigModule } from 'vi-configs';
import { OrderController } from './order/controllers/order.controller';

@Module({
  imports: [
    AuthModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([OrderEntity]),
    DBModule.forRoot({
      entities: [OrderEntity],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderController],
})
export class DomainModule {}
