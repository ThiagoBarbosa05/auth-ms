import bcrypt from "bcryptjs";
import type { HashGenerator } from "../../domain/cryptography/hash-generator";

export class HashGeneratorImpl implements HashGenerator {
  async generateHash(password: string) {
    const passwordHashed = await bcrypt.hash(password, 8);

    return passwordHashed;
  }
}
