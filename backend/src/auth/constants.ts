export const AUTH_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET || 'mohajacar03reo3209',
  JWT_EXPIRES_IN: '1h',
  KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER || 'http://localhost:8080/auth/realms/master',
  KEYCLOAK_AUDIENCE: process.env.KEYCLOAK_AUDIENCE || 'account',
  KEYCLOAK_PUBLIC_KEY: process.env.KEYCLOAK_PUBLIC_KEY || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMXaBmPEv7D/OdgiEd5Pogbijya9wBSdR4FPnTwlFFDaS/dmmSDLeN7pCHZbyGJhJkyKVJRuetIwW9KS8j//ZSdA1WKd1zJm7Ja648Ry6gd0ftn4Uhf1x9QcHfRHWFDyggzr44cgowTFeNVXy44vS5Y6xSqKZanf4fd8GAodtTz0Uq+gv+zh/SvrQBxahdWoEVn35e9lhqkpENefZb8UR7a7ma6szMX1YyPza1a2ufIqPdt9Q0Rdtco1FA/kNF+BLnwmofroBmJrzT0074vhZynUobsnPN7fCeq5l3mys/pQqQfnA6FblL8wrBSc5/t6wrloO0tPM3mSvqcohElwzQIDAQAB',
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'nestjs-backend',
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET || 'F70QxKLomA2eoKoIOcvYfw3kLlZ2sJBM',
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  DEVICE: 'device',
};

export const PERMISSIONS = {
  READ_DEVICES: 'read:devices',
  WRITE_DEVICES: 'write:devices',
  DELETE_DEVICES: 'delete:devices',
  READ_DEVICE_DATA: 'read:device_data',
  WRITE_DEVICE_DATA: 'write:device_data',
};
