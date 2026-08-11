import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'

const GenratePayslipForm = ({ employees = [], onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      <Plus className="w-4 h-4" /> Generate Payslip
    </button>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsOpen(false)
    if (typeof onSuccess === 'function') onSuccess()
  }

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='card max-w-lg w-full p-6 animate-slide-up'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>Generate Monthly Payslip</h3>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className='text-slate-400 hover:text-slate-600 p-1'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select
              name="employeeId"
              required
              className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900'
            >
              {employees.length === 0 ? (
                <option value="">No employees available</option>
              ) : (
                employees.map((employee) => (
                  <option key={employee._id || employee.id} value={employee._id || employee.id}>
                    {employee.firstName} {employee.lastName} ({employee.position})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
              <select
                name="month"
                className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900'
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
                className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900'
              />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                placeholder="0"
                className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Allowances</label>
              <input
                type="number"
                name="allowances"
                placeholder="0"
                className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Deductions</label>
              <input
                type="number"
                name="deductions"
                placeholder="0"
                className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900'
              />
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition'
            >
              Create Payslip
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GenratePayslipForm
