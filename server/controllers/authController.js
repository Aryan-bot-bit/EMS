import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// login for employee and admin
// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body;
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const normalizedRole = String(role_type || "").trim().toLowerCase();

        if (!normalizedEmail || !password || !normalizedRole) {
            return res.status(400).json({ error: "Email, password, and role are required" });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (normalizedRole === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({ error: "Not authorized as admin" });
        }

        if (normalizedRole === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ error: "Not authorized as employee" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        };

        const jwtSecret = process.env.JWT_SECRET || "super-jwt-key";
        const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

        return res.json({ user: payload, token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Login failed" });
    }
};

// get session for employee
// GET /api/auth/session
export const session = (req, res) => {
    return res.json({ user: req.session });
};

// change password for employee and admin
// POST /api/auth/change-password
export const changePassword = async (req, res) => {
    try {
        const session = req.session;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Both passwords are required" });
        }

        const user = await User.findById(session.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(session.userId, { password: hashed });

        return res.json({ success: true });
    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({ error: "Failed to change password" });
    }
};
