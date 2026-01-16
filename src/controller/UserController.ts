import { prisma } from "../utils/prisma";
import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';

export class UserController {
    async createAdmin(req: Request, res: Response): Promise<void> {
        const { name, telephone, cpf, email, password } = req.body;

        try {
            if (!name || !telephone || !email || !password) {
                res.status(400).json({ message: "All fields are required." });
                return;
            }

            const existingUser = await prisma.users.findFirst({
                where: {
                    OR: [{ email }, { cpf }]
                }
            });

           if (existingUser) {
                if (existingUser.email === email) {
                    res.status(409).json({ message: "Barber with this email already exists." });
                } else if (existingUser.cpf === cpf) {
                    res.status(409).json({ message: "Barber with this CPF already exists." });
                } else if (existingUser.telephone === telephone) {
                    res.status(409).json({ message: "Barber with this telephone already exists." });
                }
                return;
            }

            const hashedPassword = await hash(password, 8);

            const admin = await prisma.users.create({
                data: {
                    name,
                    telephone,
                    email,
                    password: hashedPassword,
                    type: 'ADMIN'
                }
            });

            res.status(201).json({ message: "Admin created successfully.", admin });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }

    };

    async createBarber(req: Request, res: Response): Promise<void> {
        const { name, telephone, cpf, email, password } = req.body;

        try {
            if (!name || !telephone || !email|| !cpf || !password) {
                res.status(400).json({ message: "All fields are required." });
                return;
            }

            const existingUser = await prisma.users.findFirst({
                where: {
                    OR: [{ email }, { cpf }]
                }
            });

            if (existingUser) {
                if (existingUser.email === email) {
                    res.status(409).json({ message: "Barber with this email already exists." });
                } else if (existingUser.cpf === cpf) {
                    res.status(409).json({ message: "Barber with this CPF already exists." });
                } else if (existingUser.telephone === telephone) {
                    res.status(409).json({ message: "Barber with this telephone already exists." });
                }
                return;
            }

            const hashedPassword = await hash(password, 8);

            const barber = await prisma.users.create({
                data: {
                    name,
                    telephone,
                    email,
                    cpf,
                    password: hashedPassword,
                    type: 'BARBER'
                }
            });

            res.status(201).json({ message: "Barber created successfully.", barber });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }

    };


    async createClient(req: Request, res: Response): Promise<void> {
        const { name, telephone} = req.body;

        try {
            if (!name || !telephone) {
                res.status(400).json({ message: "All fields are required." });
                return;
            }

            const existingUser = await prisma.users.findFirst({
                where: {telephone}
            });

            if (existingUser) {
                res.status(409).json({ message: "Client with this telephone already exists." });
                return;
            }

            const client = await prisma.users.create({
                data: {
                    name,
                    telephone,
                    type: 'CLIENT'
                }
            });

            res.status(201).json({ message: "Client created successfully.", client });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }

    };
    


};