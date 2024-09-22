import { AUTH_PROVIDERS } from "./constants";

export type AuthProvider = typeof AUTH_PROVIDERS[keyof typeof AUTH_PROVIDERS];
