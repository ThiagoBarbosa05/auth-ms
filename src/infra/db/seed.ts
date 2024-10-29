import { hash } from "bcryptjs";
import { db } from ".";
import { users } from "./schema";

export async function createAdmin() {
  await db.insert(users).values({
    email: "admin@example.com",
    name: "Administrador",
    role: "ADMIN",
    password: await hash("admin", 8),
  });

  console.log("Seed Successfully");
}

createAdmin();
