export type TokenPayload = {
  sub?: string;
  role: string | null;
  userName: string | null;
};

export interface TokenGenerator {
  generateJwt({ role, sub, userName }: TokenPayload): string;
}
