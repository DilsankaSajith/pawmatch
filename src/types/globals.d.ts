import { UserRole } from '@/types';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
    };
  }
}
