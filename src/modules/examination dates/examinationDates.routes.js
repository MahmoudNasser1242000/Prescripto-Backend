import {Router} from "express"
import { updateExaminationDate } from "./examinationDates.controller.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import schemaValidation from "../../../services/validationSchema.js";
import { updateExaminationDatesIdSchema } from "./examinationDates.validation.js";

const examinationDatesRouter = Router();

examinationDatesRouter.use(protectAuth)

examinationDatesRouter.patch("/updateExaminationDate/:docId/:timeId", roleAccess("super-manager", "manager"), schemaValidation(updateExaminationDatesIdSchema), updateExaminationDate)

export default examinationDatesRouter;