import type { Request, Response } from "express";
import { authenticateCustomerFactory } from "../../factories/authenticate-customer-factory";
import { z, ZodError } from "zod";
import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentials";

const loginUserSchema = z.object({
  email: z.string().email({ message: "This field cannot be empty." }),
  password: z.string().min(6, { message: "This field cannot be empty." }),
});
export async function authenticateCustomerController(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = loginUserSchema.parse(req.body);

    const authenticateCustomer = authenticateCustomerFactory();

    const { accessToken } = await authenticateCustomer.execute({
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
      return res.status(401).send({ message: err.message });
    }
    return res.status(500).send({ message: "Internal server error." });
  }
}
