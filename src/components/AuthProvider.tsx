'use client'

import { SessionProvider, useSession } from 'next-auth/react';
import { createContext, ReactNode,useContext } from 'react';

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  return (
    <AuthContext.Provider value={{ user: session?.user, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
