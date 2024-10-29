import type {
  TokenGenerator,
  TokenPayload,
} from "../../domain/cryptography/token-generator";
import jwt from "jsonwebtoken";
import { env } from "../../env";

export class TokenGeneratorImpl implements TokenGenerator {
  generateJwt({ role, sub, userName }: TokenPayload): string {
    return jwt.sign(
      { sub, role, userName },
      Buffer.from(env.JWT_PRIVATE_KEY, "base64").toString("utf-8"),
      { expiresIn: "30m", algorithm: "RS256" }
    );
  }
}
