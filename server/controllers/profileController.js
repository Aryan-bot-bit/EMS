import Employee from "../models/Emplooyee.js";

// get profile
// get /api/profile
export const getProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });

        if (!employee) {
            // Authenticated user is not an employee - return admin profile
            return res.json({
                firstName: "Admin",
                lastName: "",
                email: session.email,
            });
        }
        return res.json(employee);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch profile" });
    }
};

// update profile
// put /api/profile
export const updateProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        if (employee.isDeleted) {
            return res.status(403).json({ error: "Your account is deactivated. You cannot update your profile." });
        }

        const { fullName, email, position, bio } = req.body;
        const nameParts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
        const firstName = nameParts.shift() || employee.firstName;
        const lastName = nameParts.join(" ") || employee.lastName;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employee._id,
            {
                firstName,
                lastName,
                email: String(email || "").trim(),
                position: String(position || "").trim(),
                bio: String(bio || ""),
            },
            { new: true }
        );

        return res.json({ success: true, profile: updatedEmployee });

    } catch (error) {
        return res.status(500).json({ error: "Failed to update profile" });
    }
};





//update profile
//put/api/Profiler