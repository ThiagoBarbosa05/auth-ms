import bcrypt from "bcryptjs";
import type { HashCompare } from "../../domain/cryptography/hash-compare";

export class HashCompareImpl implements HashCompare {
  compare(passwordRaw: string, passwordHashed: string) {
    return bcrypt.compare(passwordRaw, passwordHashed);
  }
}
