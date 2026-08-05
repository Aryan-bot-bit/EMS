

import { useCallback, useEffect, useState } from 'react'
import { dummyAttendanceData } from '../assets/assets'
import CheckInButton from '../assets/components/attendance/checkinbutton'
import AttendanceStats from '../assets/components/attendance/attendancestats'
import AttendanceHistory from '../assets/components/attendance/attendanceHistory'

// Simple fallback Loading component to prevent crashes
const Loading = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const Attendance = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [] )

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  if (loading) return <Loading />

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayRecord = history.find((r)=> new Date(r.date).toDateString() === today.toDateString())

  return (
    <div className='animate-fade-in'>
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track your work hours and daily check-ins</p>
      </div>

      {isDeleted ? (
  <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
    <p className="text-rose-600">You can no longer clock in or out because your employee records have been marked as deleted.</p>
  </div>
): (
  <div className="mb-8">
    <CheckInButton todayRecord={todayRecord} onAction={fetchData}/>
  </div>
)}
<AttendanceStats history={history}/>
<AttendanceHistory history={history}/>
    </div>
  )
}

export default Attendance