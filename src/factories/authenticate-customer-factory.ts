import { AuthenticateCustomerUseCase } from "../domain/use-cases/authenticate-customer";
import { HashCompareImpl } from "../infra/cryptography/hash-compareImpl";
import { TokenGeneratorImpl } from "../infra/cryptography/token-generatorImpl";
import { CustomerRepositoryImpl } from "../infra/db/repositories/customer-repositoryImpl";

export function authenticateCustomerFactory() {
  const customerRepository = new CustomerRepositoryImpl();
  const hashCompare = new HashCompareImpl();
  const tokenGenerator = new TokenGeneratorImpl();

  return new AuthenticateCustomerUseCase(
    customerRepository,
    hashCompare,
    tokenGenerator
  );
}
