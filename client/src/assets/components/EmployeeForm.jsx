import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 as Loader2Icon } from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "IT Support",
  "Customer Success",
  "Product Management",
  "Design",
];

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const employeeData = Object.fromEntries(formData.entries());

    if (isEditMode) {
      const password = formData.get("password");
      if (!password) formData.delete("password");
    }

    try {
      const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
      const method = isEditMode ? "put" : "post";

      await api[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onSuccess) {
        onSuccess(employeeData);
      } else {
        navigate("/employees");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">First Name</label>
            <input
              className="w-full"
              name="firstName"
              required
              defaultValue={initialData?.firstName || ""}
            />
          </div>

          <div>
            <label className="block mb-2">Last Name</label>
            <input
              className="w-full"
              name="lastName"
              required
              defaultValue={initialData?.lastName || ""}
            />
          </div>

          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              className="w-full"
              name="phone"
              required
              defaultValue={initialData?.phone || ""}
            />
          </div>

          <div>
            <label className="block mb-2">Join Date</label>
            <input
              className="w-full"
              type="date"
              name="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2">Bio (Optional)</label>
            <textarea
              className="w-full resize-none"
              name="bio"
              rows={3}
              placeholder="Brief description..."
              defaultValue={initialData?.bio || ""}
            />
          </div>
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">Department</label>
            <select
              className="w-full"
              name="department"
              defaultValue={initialData?.department || ""}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Position</label>
            <input
              className="w-full"
              name="position"
              required
              defaultValue={initialData?.position || ""}
            />
          </div>

          <div>
            <label className="block mb-2">Basic Salary</label>
            <input
              className="w-full"
              type="number"
              name="basicSalary"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.basicSalary || 0}
            />
          </div>

          <div>
            <label className="block mb-2">Allowances</label>
            <input
              className="w-full"
              type="number"
              name="allowances"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.allowances || 0}
            />
          </div>

          <div>
            <label className="block mb-2">Deductions</label>
            <input
              className="w-full"
              type="number"
              name="deductions"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.deductions || 0}
            />
          </div>

          {isEditMode && (
            <div>
              <label className="block mb-2">Status</label>
              <select
                className="w-full"
                name="employmentStatus"
                defaultValue={initialData?.employmentStatus || "ACTIVE"}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Account Setup
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label className="block mb-2">Work Email</label>
            <input
              type="email"
              className="w-full"
              name="email"
              required
              defaultValue={initialData?.email || ""}
            />
          </div>

          {!isEditMode && (
            <div>
              <label className="block mb-2">Temporary Password</label>
              <input type="password" className="w-full" name="password" required />
            </div>
          )}

          <div>
            <label className="block mb-2">System Role</label>
            <select
              className="w-full"
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center"
        >
          {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;