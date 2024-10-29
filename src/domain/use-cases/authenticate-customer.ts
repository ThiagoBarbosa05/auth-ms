import type { HashCompare } from "../cryptography/hash-compare";
import type { TokenGenerator } from "../cryptography/token-generator";
import { InvalidCredentialsError } from "../errors/InvalidCredentials";
import type { CustomerRepository } from "../repositories/customer-repository";

type AuthenticateCustomerUseCaseInput = {
  email: string;
  password: string;
};

type AuthenticateCustomerUseCaseOutput = {
  accessToken: string;
};

export class AuthenticateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private hashCompare: HashCompare,
    private tokenGenerator: TokenGenerator
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateCustomerUseCaseInput): Promise<AuthenticateCustomerUseCaseOutput> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new InvalidCredentialsError("Invalid credentials.");
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      customer.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid credentials.");
    }

    const accessToken = this.tokenGenerator.generateJwt({
      sub: customer.id,
      role: customer.role,
      userName: customer.name,
    });

    return { accessToken };
  }
}
