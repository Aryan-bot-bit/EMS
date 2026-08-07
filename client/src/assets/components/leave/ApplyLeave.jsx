import React, { useState } from 'react'
import { X } from 'lucide-react'

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: 'SICK',
    fromDate: '',
    toDate: '',
    reason: '',
  })

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setLoading(false)
    onSuccess?.()
    onClose()
  }

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm' onClick={onClose}>
      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in' onClick={(e) => e.stopPropagation()}>
        {/* ----- Header------*/}
        <div className='flex items-center justify-between p-6 pb-0'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800'>Apply for leave</h2>
            <p className='text-sm text-slate-400 mt-0.5'>Submit your leave request for approval</p>
          </div>
          <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className='p-6 space-y-4' onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <label className='block'>
              <span className='text-sm text-slate-600'>Leave type</span>
              <select
                name='type'
                value={form.type}
                onChange={handleChange}
                className='input'
              >
                <option value='SICK'>Sick Leave</option>
                <option value='CASUAL'>Casual Leave</option>
                <option value='ANNUAL'>Annual Leave</option>
              </select>
            </label>

            <label className='block'>
              <span className='text-sm text-slate-600'>From</span>
              <input
                type='date'
                name='fromDate'
                value={form.fromDate}
                min={minDate}
                onChange={handleChange}
                className='input'
                required
              />
            </label>

            <label className='block'>
              <span className='text-sm text-slate-600'>To</span>
              <input
                type='date'
                name='toDate'
                value={form.toDate}
                min={form.fromDate || minDate}
                onChange={handleChange}
                className='input'
                required
              />
            </label>

            <label className='block'>
              <span className='text-sm text-slate-600'>Reason</span>
              <textarea
                name='reason'
                value={form.reason}
                onChange={handleChange}
                className='input resize-none'
                rows='4'
                required
              />
            </label>
          </div>

          <div className='flex justify-end gap-3 pt-3'>
            <button type='button' onClick={onClose} className='btn-secondary'>Cancel</button>
            <button type='submit' className='btn-primary' disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModal