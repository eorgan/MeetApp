import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import Usercontroller from './app/controllers/UserController';
import Sessioncontroller from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetController from './app/controllers/MeetController';
import SubscriptionController from './app/controllers/SubscriptionController';
import OrganizingController from './app/controllers/OrganizingController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', Usercontroller.store);
routes.post('/sessions', Sessioncontroller.store);

routes.use(authMiddleware);

routes.put('/users', Usercontroller.update);

routes.get('/meet', MeetController.index);
routes.post('/meet', MeetController.store);
routes.put('/meet/:id', MeetController.update);
routes.delete('/meet/:id', MeetController.delete);

routes.post('/meet/:meetupId/subscriptions', SubscriptionController.store);
routes.get('/subscriptions', SubscriptionController.index);

routes.get('/organizing', OrganizingController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
