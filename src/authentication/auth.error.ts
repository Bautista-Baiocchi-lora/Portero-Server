export class AuthenticationError extends Error {
  constructor(message?: string) {
    super(`Auth Exception: ${message}`);
  }
}
