import { eq } from "drizzle-orm";
import { db } from "..";

import { users } from "../schema";
import type { AdminRepository } from "../../../domain/repositories/admin-repository";
import { Admin } from "../../../domain/entities/admin";

export class AdminRepositoryImpl implements AdminRepository {
  async create(admin: Admin) {
    const adminFromDb = await db
      .insert(users)
      .values({
        email: admin.email,
        name: admin.name,
        role: "ADMIN",
        password: admin.password,
      })
      .returning();

    return Admin.create({
      email: adminFromDb[0].email,
      name: adminFromDb[0].name,
      password: adminFromDb[0].password,
      role: adminFromDb[0].role,
      id: adminFromDb[0].id,
    });
  }
  async findByEmail(email: string) {
    const adminAlreadyExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (adminAlreadyExists.length > 0) {
      return Admin.create({
        email: adminAlreadyExists[0].email,
        name: adminAlreadyExists[0].name,
        password: adminAlreadyExists[0].password,
        role: adminAlreadyExists[0].role,
        id: adminAlreadyExists[0].id,
      });
    }
    return null;
  }
}
