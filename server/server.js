import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import multer from "multer";
import connectDB from "./config/db.js";
import { ensureDefaultAdmin } from "./seed.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });
import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRouters.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/ingest.js";

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(multer().none());

// routes
app.get("/", (req, res) => res.send("server is running"));
app.use("/api/auth", authRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));
await connectDB();
await ensureDefaultAdmin();

// server
app.listen(PORT, () => console.log(`server running on port ${PORT}`));