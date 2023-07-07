import express from 'express'
const router = express.Router();




import adminAuthController from '../controllers/adminController'



router
.route('/admin/signup')
.post(adminAuthController.createAdmin)



router
.route('/admin/login')
.post(adminAuthController.loginAdmin)



export default router;