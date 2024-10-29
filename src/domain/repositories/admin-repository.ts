import type { Admin } from "../entities/admin";

export interface AdminRepository {
  create(admin: Admin): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | null>;
}
