import {Router} from 'express';
import { AuthMiddleware } from './middleware/auth';
import { NotificationsController } from './controller/NotificationsController';
import { ServicesController } from './controller/ServicesController';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authorizeRole } from './middleware/auth';


const notificationsController = new NotificationsController();
const servicesController = new ServicesController();
const userController = new UserController();
const authcontroller = new AuthController();


export const router = Router();

router.post('/createServices', servicesController.createService);
router.get('/services', servicesController.getServices);
router.put('/updateService/:id', servicesController.updateService);
router.delete('/deleteService/:id', servicesController.deleteService);

router.post('/createNotifications', notificationsController.createNotification);
router.get('/notifications', notificationsController.getAllNotifications);

router.post('/createadmin', userController.createAdmin);
router.post('/createbarber', userController.createBarber);
router.post('/createclient',AuthMiddleware, authorizeRole('ADMIN'), userController.createClient);

router.post('/authenticateAdminOrBarber', authcontroller.authenticate); 
router.post('/authClient', authcontroller.authClient); 







