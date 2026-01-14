import { prisma } from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';

export class ServicesController{
    async getServices(req: Request, res: Response): Promise<void>{
        const services = await prisma.services.findMany();
        res.status(200).json(services);
        return;
    };

    async createService(req: Request, res: Response): Promise<void> {
        const {name, duration, price} = req.body;

        try{

            if (!name || duration === undefined || price === undefined) {
                res.status(400).json({ error: "Fill in all the fields." });
                return;
            }

            const service = await prisma.services.create({
                data: {
                    name,
                    duration,
                    price
                }
            });
            res.status(201).json(service);

        } catch(error){
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        };
    };

    async updateService(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, duration, price } = req.body;

        try {
            const serviceExists = await prisma.services.findUnique({
                where: { id: Number(id) }
            });

            if (!serviceExists) {
                res.status(404).json({ error: "Service not found." });
                return;
            }

            const updatedService = await prisma.services.update({
                where: { id: Number(id) },
                data: {
                    name,
                    duration, 
                    price
                }
            });

            res.status(200).json({
                message: "Service updated successfully.",
                updatedService
            });

        } catch(error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    async deleteService(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            const serviceExists = await prisma.services.findUnique({
                where: { id: Number(id) }
            });

            if(!serviceExists){
                res.status(404).json({ error: "Service not found." });
                return;
            }

            await prisma.services.delete({
                where: { id: Number(id) }
            })

            res.status(200).json({ message: "Service deleted successfully." });
        } catch(error){
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}