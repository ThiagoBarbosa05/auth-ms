import { eq } from "drizzle-orm";
import { db } from "..";
import { Customer } from "../../../domain/entities/customer";
import type { CustomerRepository } from "../../../domain/repositories/customer-repository";
import { users } from "../schema";

export class CustomerRepositoryImpl implements CustomerRepository {
  async create(customer: Customer) {
    const customerFromDb = await db
      .insert(users)
      .values({
        email: customer.email,
        name: customer.name,
        role: "CUSTOMER",
        password: customer.password,
      })
      .returning();

    return Customer.create({
      email: customerFromDb[0].email,
      name: customerFromDb[0].name,
      password: customerFromDb[0].password,
      role: customerFromDb[0].role,
      id: customerFromDb[0].id,
    });
  }
  async findByEmail(email: string) {
    const userAlreadyExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (userAlreadyExists.length > 0) {
      return Customer.create({
        email: userAlreadyExists[0].email,
        name: userAlreadyExists[0].name,
        password: userAlreadyExists[0].password,
        role: userAlreadyExists[0].role,
        id: userAlreadyExists[0].id,
      });
    }
    return null;
  }
}
