import { Module } from '@nestjs/common';
import { AuthModule } from '@order/auth';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressEntity } from './address/entity/user.address.entity';
import { DBModule } from '@order/database';
import { TerminusModule } from '@nestjs/terminus';
import { AppLoggerModule } from '@order/logger';
import { ConfigModule } from '@order/config';
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
