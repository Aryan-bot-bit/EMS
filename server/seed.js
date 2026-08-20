import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "admin123";

export async function ensureDefaultAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!ADMIN_EMAIL) {
      console.warn("Missing ADMIN_EMAIL env variable; skipping default admin creation");
      return false;
    }

    const existingAdmin = await User.findOne({
      email: ADMIN_EMAIL.toLowerCase(),
    });

    if (existingAdmin) {
      return true;
    }

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);

    const admin = await User.create({
      email: ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Default admin user created");
    console.log("email:", admin.email);
    console.log("password:", TemporaryPassword);
    return true;
  } catch (error) {
    console.error("Default admin creation failed:", error);
    return false;
  }
}

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!ADMIN_EMAIL) {
      console.error("Missing ADMIN_EMAIL env variable");
      process.exit(1);
    }

    await connectDB();
    await ensureDefaultAdmin();
    process.exit(0);
  } catch (error) {
    console.error("seed failed:", error);
  }
}

if (process.argv[1] && process.argv[1].includes("seed.js")) {
  registerAdmin();
}