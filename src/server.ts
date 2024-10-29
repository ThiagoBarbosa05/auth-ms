import express from "express";
import { compare, hash } from "bcryptjs";

import { env } from "./env";
import { z } from "zod";
import { eq } from "drizzle-orm";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { db } from "./infra/db";
import { users } from "./infra/db/schema";

import { customerRouter } from "./infra/routes/customer-routes";
import { adminRouter } from "./infra/routes/admin-routes";

const app = express();

app.use(express.json());

app.use("/api", customerRouter);
app.use("/api", adminRouter);

// interface DecodedToken extends JwtPayload {
//   role: "CUSTOMER" | "ADMIN";
// }

// app.get("/api/users/profile", async (req, res) => {
//   try {
//     const accessToken = req.headers.authorization?.split("Bearer ")[1];

//     if (!accessToken) {
//       return res.status(403).send({ message: "Access Token not provided." });
//     }

//     const decodedToken = jwt.verify(
//       accessToken,
//       Buffer.from(env.JWT_PUBLIC_KEY, "base64").toString("utf-8"),
//       { algorithms: ["RS256"] }
//     ) as DecodedToken;

//     const userId = decodedToken.sub;

//     if (!userId) {
//       return res.status(403).send({ message: "Access Token not provided." });
//     }

//     const user = await db.select().from(users).where(eq(users.id, userId));

//     res.status(200).send({
//       user: {
//         id: user[0].id,
//         name: user[0].name,
//         email: user[0].email,
//       },
//     });
//   } catch (err) {
//     return res.status(403).send({ message: "Token expired/invalid." });
//   }
// });

app.listen(3001, () => {
  console.log("Server running on port 3001!");
});
