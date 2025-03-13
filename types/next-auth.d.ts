import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Kullanıcı oturumu için genişletilmiş tip tanımı
   */
  interface Session {
    user: {
      id: string;
      username: string;
      displayName: string;
      isAdmin: boolean;
      isModerator: boolean;
    } & DefaultSession['user'];
  }

  /**
   * Kullanıcı için genişletilmiş tip tanımı
   */
  interface User {
    id: string;
    username: string;
    displayName: string;
    isAdmin: boolean;
    isModerator: boolean;
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWT token için genişletilmiş tip tanımı
   */
  interface JWT {
    id: string;
    username: string;
    displayName: string;
    isAdmin: boolean;
    isModerator: boolean;
  }
} 