import express from 'express';

const router = express.Router();



import scheduleController from '../controllers/schedulingController';




router
.route('/')
.post(scheduleController.createSchedule)
.get(scheduleController.getAllSchedules);




router
.route('/:scheduleId')
.get(scheduleController.getSchedule)
.patch(scheduleController.updateSchedule)
.delete(scheduleController.deleteSchedule);




router
.route('/find-driver/:id')
.get(scheduleController.getSchedulesByDriver)




router
.route('/find-vehicle/:id')
.get(scheduleController.getSchedulesByVehicle);



export default router;

