import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@order/config';
import { FirebaseAuthStrategy } from './auth.strategy';

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'firebase-auth' })],
  providers: [FirebaseAuthStrategy],
  exports: [PassportModule, FirebaseAuthStrategy],
})
export class AuthModule {}
