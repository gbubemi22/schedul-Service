import express from 'express';
const router = express.Router();

import getSchedulesByDayWeekMonth from  '../controllers/fillterController';




router.get('/', getSchedulesByDayWeekMonth);




export default router;




