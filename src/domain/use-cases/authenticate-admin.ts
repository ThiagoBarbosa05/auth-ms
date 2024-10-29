import type { HashCompare } from "../cryptography/hash-compare";
import type { TokenGenerator } from "../cryptography/token-generator";
import { InvalidCredentialsError } from "../errors/InvalidCredentials";
import type { AdminRepository } from "../repositories/admin-repository";

type AuthenticateAdminUseCaseInput = {
  email: string;
  password: string;
};

type AuthenticateAdminUseCaseOutput = {
  accessToken: string;
};

export class AuthenticateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashCompare: HashCompare,
    private tokenGenerator: TokenGenerator
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateAdminUseCaseInput): Promise<AuthenticateAdminUseCaseOutput> {
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new InvalidCredentialsError("Invalid credentials.");
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid credentials.");
    }

    const accessToken = this.tokenGenerator.generateJwt({
      sub: admin.id,
      role: admin.role,
      userName: admin.name,
    });

    return { accessToken };
  }
}
