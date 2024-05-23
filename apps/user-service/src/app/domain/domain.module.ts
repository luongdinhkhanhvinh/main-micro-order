import { Module } from '@nestjs/common';
import { AuthModule } from 'vi-auths';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressEntity } from './address/entity/user.address.entity';
import { DBModule } from 'vi-databases';
import { TerminusModule } from '@nestjs/terminus';
import { AppLoggerModule } from 'vi-logger';
import { ConfigModule } from 'vi-configs';
import { UserAddressController } from './address/controller/user.address.controller';

@Module({
  imports: [
    AuthModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([UserAddressEntity]),
    DBModule.forRoot({
      entities: [UserAddressEntity],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],
  controllers: [UserAddressController],
  providers: [UserAddressController],
})
export class DomainModule {}
