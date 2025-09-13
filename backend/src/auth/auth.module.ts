import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { KeycloakStrategy } from './strategies/keycloak.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mohajacar03reo3209',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, KeycloakStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
