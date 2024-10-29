import { AuthenticateAdminUseCase } from "../domain/use-cases/authenticate-admin";
import { HashCompareImpl } from "../infra/cryptography/hash-compareImpl";
import { TokenGeneratorImpl } from "../infra/cryptography/token-generatorImpl";
import { AdminRepositoryImpl } from "../infra/db/repositories/admin-repositoryImpl";

export function authenticateAdminFactory() {
  const adminRepository = new AdminRepositoryImpl();
  const hashCompare = new HashCompareImpl();
  const tokenGenerator = new TokenGeneratorImpl();

  return new AuthenticateAdminUseCase(
    adminRepository,
    hashCompare,
    tokenGenerator
  );
}
