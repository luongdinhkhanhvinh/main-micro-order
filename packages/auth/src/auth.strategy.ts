import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@order/config';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { FirebaseInstance } from './firebase.service';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    console.log(this.configService);
  }

  validate(token: string) {
    FirebaseInstance.Instance;
    const user = auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException();
      });
    // req.user
    console.log(user);
    return user;
  }
}
