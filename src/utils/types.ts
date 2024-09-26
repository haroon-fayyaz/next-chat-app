import { AUTH_PROVIDERS } from "./constants";

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];

export interface AuthenticationCredentials {
  name?: string;
  email: string;
  password: string;
}

export interface AuthenticationParams {
  credentials?: AuthenticationCredentials;
  provider: AuthProvider;
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
}

export interface Message {
  id: number;
  sender: "You" | string;
  text: string;
  avatar: string;
  timestamp: string;
}
