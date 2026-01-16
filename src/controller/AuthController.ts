import { Request, Response } from "express";
import { prisma } from "../utils/prisma"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


export class AuthController {

  async authenticate(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;


    const users = await prisma.users.findFirst({
      where: {
        email,
        OR: [{ type: "ADMIN" }, { type: "BARBER" }]
      }
    });

    if (!users) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      res.status(500).json({ error: "Erro de configuração do servidor: SECRET_KEY não definida." });
      return;
    }

    const isValuePassword = await compare(password, users.password);

    if (!isValuePassword) {
      res.status(401).json({ error: "Password incorrect" });
      return;
    };

    const token = sign({ id: users.id, type: users.type }, secretKey, { expiresIn: "1d" });

    res.json({ user: { id: users.id, email: users.email, type: users.type }, token });
  };



  async authClient(req: Request, res: Response): Promise<void> {
    const { telephone, password } = req.body;


    const users = await prisma.users.findFirst({
      where: {
        telephone,
        type: "CLIENT"
      }
    });

    if (!users) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      res.status(500).json({ error: "Erro de configuração do servidor: SECRET_KEY não definida." });
      return;
    }

    const isValuePassword = await compare(password, users.password);

    if (!isValuePassword) {
      res.status(401).json({ error: "Password incorrect" });
      return;
    };

    const token = sign({ id: users.id, type: users.type }, secretKey, { expiresIn: "1d" });

    res.json({ user: { id: users.id, telephone: users.telephone, type: users.type }, token });
  };
}