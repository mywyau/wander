import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Example if using Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    try {
      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Save the business to the database
      const business = await prisma.business.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      res.status(201).json({ message: "Business created", business });
    } catch (error) {
      res.status(500).json({ error: "Error creating business" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
