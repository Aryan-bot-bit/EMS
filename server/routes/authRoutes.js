import { Router } from "express";
import { getEmployees } from "../controllers/employeeController.js";
import { protect } from "../middleware/auth.js";


const authRouter = Router();

authRouter.post("/login", login)
authRouter.get("/session", protect ,session)
authRouter.post("/change-password", changePassword)

export default authRouter;