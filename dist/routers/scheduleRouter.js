"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const schedulingController_1 = __importDefault(require("../controllers/schedulingController"));
router
    .route('/')
    .post(schedulingController_1.default.createSchedule)
    .get(schedulingController_1.default.getAllSchedules);
router
    .route('/:id')
    .get(schedulingController_1.default.getSchedule)
    .patch(schedulingController_1.default.updateSchedule)
    .delete(schedulingController_1.default.deleteSchedule);
router
    .route('/find-driver/:id')
    .get(schedulingController_1.default.getSchedulesByDriver);
router
    .route('/find-vehicle/:id')
    .get(schedulingController_1.default.getSchedulesByVehicle);
exports.default = router;
