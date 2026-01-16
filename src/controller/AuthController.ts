import { Request, Response } from "express";
import { prisma } from "../utils/prisma"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { randomInt } from "crypto";


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

    if (!users.password) {
      res.status(401).json({ error: "Senha não cadastrada para este usuário." });
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

  async sendClientVerificationCode(req: Request, res: Response): Promise<void> {
    const { telephone } = req.body;

    const user = await prisma.users.findFirst({
      where: { telephone, type: "CLIENT" }
    });

    if (!user) {
      res.status(404).json({ error: "Telefone não cadastrado para CLIENT." });
      return;
    }

    const code = randomInt(100000, 999999).toString();

    await prisma.verificationCode.upsert({
      where: { telephone },
      update: { code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
      create: { telephone, code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }
    });

    //Simulação para enviar codigo
    console.log(`Código de verificação enviado para ${telephone}: ${code}`);

    res.json({ message: "Código de verificação enviado para o telefone." });
  }

  async validateClientCode(req: Request, res: Response): Promise<void> {
    const { telephone, code } = req.body;

    const record = await prisma.verificationCode.findUnique({
      where: { telephone }
    });

    if (!record || record.code !== code || record.expiresAt < new Date()) {
      res.status(401).json({ error: "Código inválido ou expirado." });
      return;
    }


    await prisma.verificationCode.delete({ where: { telephone } });

    const user = await prisma.users.findFirst({
      where: { telephone, type: "CLIENT" }
    });

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const secretKey = process.env.SECRET_KEY!;
    const token = sign({ id: user.id, type: user.type }, secretKey, { expiresIn: "1d" });

    res.json({ user: { id: user.id, telephone: user.telephone, type: user.type }, token });
  };


};