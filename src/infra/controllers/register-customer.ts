import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { registerCustomerFactory } from "../../factories/register-customer-factory";
import { CustomerAlreadyExistsError } from "../../domain/errors/CustomerAlreadyExists";

const registerUserSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Please enter a password with at least 6 characters." }),
});
export async function registerCustomerController(req: Request, res: Response) {
  try {
    const { name, email, password } = registerUserSchema.parse(req.body);

    const registerCustomer = registerCustomerFactory();

    await registerCustomer.execute({ email, password, name });

    return res.status(201).send();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.flatten().fieldErrors;
      return res.status(400).send(errors);
    }

    if (err instanceof CustomerAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }
    return res.status(500).send({ message: "Internal server error." });
  }
}
