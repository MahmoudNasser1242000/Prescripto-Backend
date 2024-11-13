import {Router} from "express"
import { addExaminationDate, removeExaminationDate, updateExaminationDate } from "./examinationDates.controller.js";
import protectAuth from "../../middlewares/ProtectAuth.js";
import roleAccess from "../../middlewares/roleAccess.js";
import schemaValidation from "../../../services/validationSchema.js";
import { addExaminationDatesIdSchema, deleteExaminationDatesIdSchema, updateExaminationDatesIdSchema } from "./examinationDates.validation.js";

const examinationDatesRouter = Router();

examinationDatesRouter.use(protectAuth)

examinationDatesRouter.post("/:docId", roleAccess("super-manager", "manager"), schemaValidation(addExaminationDatesIdSchema), addExaminationDate)

examinationDatesRouter.patch("/:docId/:timeId", roleAccess("super-manager", "manager"), schemaValidation(updateExaminationDatesIdSchema), updateExaminationDate)

examinationDatesRouter.delete("/:docId/:timeId", roleAccess("super-manager", "manager"), schemaValidation(deleteExaminationDatesIdSchema), removeExaminationDate)

export default examinationDatesRouter;