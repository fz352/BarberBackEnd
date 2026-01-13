import {Router} from 'express';
import { AuthMiddleware } from './middleware/auth';
import { NotificationsController } from './controller/NotificationsController';


const notificationsController = new NotificationsController();
// const authcontroller = new AuthController();


export const router = Router();


router.post('/createNotifications', notificationsController.createNotification);
router.get('/notifications', notificationsController.getAllNotifications);






