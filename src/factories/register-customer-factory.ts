import { RegisterUserUseCase } from "../domain/use-cases/register-customer";
import { HashGeneratorImpl } from "../infra/cryptography/hash-generatorImpl";
import { CustomerRepositoryImpl } from "../infra/db/repositories/customer-repositoryImpl";

export function registerCustomerFactory() {
  const hashGenerator = new HashGeneratorImpl();
  const customerRepository = new CustomerRepositoryImpl();

  return new RegisterUserUseCase(customerRepository, hashGenerator);
}
