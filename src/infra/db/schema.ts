import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Roles = pgEnum("roles", ["CUSTOMER", "ADMIN"]);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: Roles("roles"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});
