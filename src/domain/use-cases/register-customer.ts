import type { HashGenerator } from "../cryptography/hash-generator";
import { Customer } from "../entities/customer";
import { CustomerAlreadyExistsError } from "../errors/CustomerAlreadyExists";
import type { CustomerRepository } from "../repositories/customer-repository";

type RegisterUserUseCaseInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserUseCaseOutput = {
  customer: Customer;
};

export class RegisterUserUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserUseCaseInput): Promise<RegisterUserUseCaseOutput> {
    const customerAlreadyExists = await this.customerRepository.findByEmail(
      email
    );

    if (customerAlreadyExists) {
      throw new CustomerAlreadyExistsError("Email already exists");
    }

    const passwordHashed = await this.hashGenerator.generateHash(password);

    const customer = Customer.create({
      email,
      password: passwordHashed,
      name,
      role: "ADMIN",
    });

    const customerCreated = await this.customerRepository.create(customer);

    return { customer: customerCreated };
  }
}
