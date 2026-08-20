import React, { useState } from 'react'
import { Loader2Icon, LogOutIcon, LogInIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../api/axios'
const CheckInButton = ({ todayRecord, onAction }) => {
    const [loading, setLoading] = useState(false)
    const [localRecord, setLocalRecord] = useState(null)
    const currentRecord = localRecord || todayRecord

    const handleAttendance = async () => {
        setLoading(true)
        try {
            const response = await api.post("/attendance")
            setLocalRecord(response.data?.data || null)
            await onAction(response.data?.data)
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message || "Attendance update failed")
        } finally {
            setLoading(false)
        }
    }

    const isCheckedIn = !!currentRecord?.checkIn && !currentRecord?.checkOut
    const isCompleted = !!currentRecord?.checkOut

    return (
        <div className='fixed bottom-4 right-4 z-50'>
    <button type='button' onClick={handleAttendance} disabled={loading} className={`w-44 sm:w-48 flex justify-between items-center gap-4 p-4 rounded-xl bg-linear-to-br text-white shadow-xl ${isCheckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"}`}>
                {loading ? (
                    <Loader2Icon className="size-7 animate-spin" />
                ) : isCheckedIn ? (
                    <LogOutIcon className="size-7" />
                ) : (
                    <LogInIcon className="size-7" />
                )}

                <div className='relative flex flex-col items-center text-center'>
                    <h2 className='text-lg font-medium mb-1'>{loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}</h2>
                    <p className='text-xs opacity-80'>{isCheckedIn ? "Click to end your shift" : isCompleted ? "Start a new work shift" : "Start your work day"}</p>
                </div>
            </button>
        </div>
    )
}

export default CheckInButton