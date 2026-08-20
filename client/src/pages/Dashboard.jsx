import { useEffect, useState } from 'react'
import { dummyAdminDashboardData } from '../assets/assets'
import Loading from '../assets/components/Loading'
import EmployeeDashboard from '../assets/components/EmployeeDashboard'
import AdminDashboard from '../assets/components/AdminDashboard'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard')
        setData(res.data)
      } catch (error) {
        console.error('Dashboard error:', error)
        toast.error(error?.response?.data?.error || error?.message || 'Failed to load dashboard')
        setData(dummyAdminDashboardData)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
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