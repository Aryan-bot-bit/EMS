import { useEffect, useState } from 'react'
import {  dummyAdminDashboardData,dummyEmployeeDashboardData } from '../assets/assets'
import Loading from '../assets/components/Loading'
import EmployeeDashboard from '../assets/components/EmployeeDashboard'
import AdminDashboard from '../assets/components/AdminDashboard'

const Dashboard = () => {
  const data = dummyEmployeeDashboardData
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />
  if (!data) return <p className="text-center text-slate-500 py-12">Failed to load dashboard</p>

  if (data.role === 'ADMIN') {
    return (
      <AdminDashboard data={data}/>
    )
  } else {
    return (
      <EmployeeDashboard data={data}/> 
    )
  }
}

export default Dashboard