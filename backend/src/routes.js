import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import MeetupController from './app/controllers/MeetupController'
import SubscriptionController from './app/controllers/SubscriptionController'
import OrganizingController from './app/controllers/OrganizingController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer'
import multerConfig from './config/multer'

const routes = new Router()
const upload = multer(multerConfig)
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.use(authMiddleware)
routes.put('/users', UserController.update)
routes.post('/files', upload.single('file'), FileController.store)
routes.post('/meetups', upload.single('file'), MeetupController.store)
routes.put('/meetups/:id', upload.single('file'), MeetupController.update)
routes.get('/meetups', MeetupController.index)
routes.delete('/meetups/:id', MeetupController.delete)
routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store)
routes.get('/subscriptions', SubscriptionController.index)
routes.get('/organizing', OrganizingController.index)
routes.get('/meetups/:id', MeetupController.index)
routes.delete('/subscriptions/:id', SubscriptionController.delete)
export default routes
