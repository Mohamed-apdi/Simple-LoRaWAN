import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.KEYCLOAK_PUBLIC_KEY || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMXaBmPEv7D/OdgiEd5Pogbijya9wBSdR4FPnTwlFFDaS/dmmSDLeN7pCHZbyGJhJkyKVJRuetIwW9KS8j//ZSdA1WKd1zJm7Ja648Ry6gd0ftn4Uhf1x9QcHfRHWFDyggzr44cgowTFeNVXy44vS5Y6xSqKZanf4fd8GAodtTz0Uq+gv+zh/SvrQBxahdWoEVn35e9lhqkpENefZb8UR7a7ma6szMX1YyPza1a2ufIqPdt9Q0Rdtco1FA/kNF+BLnwmofroBmJrzT0074vhZynUobsnPN7fCeq5l3mys/pQqQfnA6FblL8wrBSc5/t6wrloO0tPM3mSvqcohElwzQIDAQAB',
      issuer: process.env.KEYCLOAK_ISSUER || 'http://localhost:8080/auth/realms/master',
      audience: process.env.KEYCLOAK_AUDIENCE || 'account',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.realm_access?.roles || [],
      username: payload.preferred_username,
    };
  }
}
