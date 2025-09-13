import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyKeycloakToken(token: string): Promise<any> {
    // Implementation for Keycloak token verification
    // This would typically involve calling Keycloak's introspection endpoint
    try {
      // Placeholder for Keycloak token verification logic
      return { valid: true, payload: {} };
    } catch (error) {
      throw new UnauthorizedException('Invalid Keycloak token');
    }
  }
}
