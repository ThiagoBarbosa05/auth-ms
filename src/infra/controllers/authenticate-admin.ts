import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentials";
import { authenticateAdminFactory } from "../../factories/authenticate-admin-factory";

const loginUserSchema = z.object({
  email: z.string().email({ message: "This field cannot be empty." }),
  password: z.string().min(1, { message: "This field cannot be empty." }),
});
export async function authenticateAdminController(req: Request, res: Response) {
  try {
    const { email, password } = loginUserSchema.parse(req.body);

    const authenticateAdmin = authenticateAdminFactory();

    const { accessToken } = await authenticateAdmin.execute({
      email,
      password,
    });

    return res.status(200).send({ accessToken });
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.flatten().fieldErrors;
      return res.status(400).send(errors);
    }

    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: "Internal server error." });
  }
}
