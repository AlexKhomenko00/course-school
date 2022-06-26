import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '@microservices/interfaces';

export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: true,
    });
  }

  async validate({ id }: IJwtPayload) {
    return id;
  }
}
