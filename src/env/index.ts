import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
