import {Router} from 'express';
import { AuthMiddleware } from './middleware/auth';
import { NotificationsController } from './controller/NotificationsController';
import { ServicesController } from './controller/ServicesController';


const notificationsController = new NotificationsController();
const servicesController = new ServicesController();
// const authcontroller = new AuthController();


export const router = Router();

router.post('/createServices', servicesController.createService);
router.get('/services', servicesController.getServices);
router.put('/updateService/:id', servicesController.updateService);
router.delete('/deleteService/:id', servicesController.deleteService);

router.post('/createNotifications', notificationsController.createNotification);
router.get('/notifications', notificationsController.getAllNotifications);







