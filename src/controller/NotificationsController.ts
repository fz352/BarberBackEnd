import { prisma } from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';

export class NotificationsController {
    async getAllNotifications(req: Request, res: Response): Promise<void>{
        const notifications = await prisma.notifications.findMany();
        res.status(200).json(notifications);
        return;
    };

    async createNotification(req: Request, res: Response): Promise<void> {
        const { telephone, text } = req.body;
        try {
            if (!telephone || !text) {
                res.status(400).json({ error: "Telephone and text are required" });
                return;
            }

            const notification = await prisma.notifications.create({
                data: {
                    telephone,
                    status: "Pendente",
                    text  
                }
            });
            res.status(201).json(notification);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }

    };
    
}