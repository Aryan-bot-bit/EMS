import bcrypt from "bcrypt";
import Employee from "../models/Emplooyee.js";
import User from "../models/User.js";
import { normalizeDepartment } from "../constants/department.js";

//get emp

//get //api //empl
export const getEmployees = async (req, res)=>{
try {
    const { department } = req.query;
    const where = {};
    if(department) where.department = department;

    const employees = await Employee.find(where).sort({createdAt: -1}).populate("userId", "email role").lean();

const result = employees.map((emp)=>({
    ...emp,
    id: emp._id.toString(),
    user: emp.userId,
    email: emp.userId?.email, 
    role: emp.userId?.role
}))
return res.json(result)
} catch (error) {
    return res.status(500).json({error : "Failed to fetch employees"})
    
}
}

//const emp
//post//api/emp

export const createEmployee = async (req, res)=>{
try {
    const {firstName, lastName, email, phone, position, 
    department, basicSalary, allowances, deductions, joinDate, 
    password, role, bio} = req.body;

    if(!email || !password || !firstName || !lastName){
    return res.status(400).json({ error: "Missing required fields" });
    }

    const normalizedDepartment = normalizeDepartment(department);

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({
        email: String(email).trim().toLowerCase(),
        password: hashed,
        role: role || "EMPLOYEE"
    })

    const employee = await Employee.create({
        userId: user._id,
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        position: String(position).trim(),
        department: normalizedDepartment,
        basicSalary: Number(basicSalary) || 0,
        allowances: Number(allowances) || 0,
        deductions: Number(deductions) || 0,
        joinDate: new Date(joinDate),
        bio: bio || "",
    })
    return res.status(201).json({success: true, employee})

} catch(error) {
if(error.code === 11000){
    return res.status(400).json({ error: "Email already exists" })
}
console.error("Create employee error:", error)
return res.status(500).json({ error: "Failed to create employee" });
}
}

//update emp
//put /api/emp/:id

export const updateEmployee = async (req, res) => {
    
try {
    const {id} = req.params;
    const {firstName, lastName, email, phone, position, 
    department, basicSalary, allowances, deductions, 
    password, role, bio, employmentStatus} = req.body;

    const employee = await Employee.findById(id);
    if(!employee) return res.status(404).json({error: "Employee not found"})

    const normalizedDepartment = normalizeDepartment(department);

    const updateData = {
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        position: String(position).trim(),
        department: normalizedDepartment,
        basicSalary: Number(basicSalary) || 0,
        allowances: Number(allowances) || 0,
        deductions: Number(deductions) || 0,
        employmentStatus: employmentStatus || "ACTIVE",
        bio: bio || "",
    };

    await Employee.findByIdAndUpdate(id, updateData, { new: true });

    const userUpdate = { email: String(email).trim().toLowerCase() };
    if (role) userUpdate.role = role;
    if (password) userUpdate.password = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(employee.userId, userUpdate)

    return res.json({ success: true, employee: updateData })
    
} catch(error) {
if(error.code === 11000){
    return res.status(400).json({ error: "Email already exists" })
}
return res.status(500).json({ error: "Failed to update employee" });
}
}


//delete emp
//delete /api/emp/:id

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await User.findByIdAndDelete(employee.userId);
        await Employee.findByIdAndDelete(id);

        return res.json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Delete employee error:", error);
        return res.status(500).json({ error: "Failed to delete employee" });
    }
}