import express, { Request, Response } from 'express';
const router = express.Router();
import authController from '../controllers/authController';


router
.route('/signup-driver')
.post(authController.createDeriver)


router
.route('/login-driver')
.post(authController.loginDriver)


router
.route('/logout')
.get(authController.logoutUser)


export default router;