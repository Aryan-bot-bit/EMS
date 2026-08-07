
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import LoginLoading from './pages/LoginLoading'
import LoginForm from './assets/components/LoginForm'
import Layout from './pages/Layout'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Leave from './pages/Leave'
import Payslips from './pages/Payslips'
import Setting from './pages/Setting'
import Dashboard from './pages/Dashboard'
import PrintPayslip from './pages/PrintPayslip'

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<LoginLoading />} />

        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/>} />

        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account"/>} />

        <Route path="/" element={<Layout />} caseSensitive={false}>


          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="payslips" element={<Payslips />} />
          <Route path="settings" element={<Setting />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/print/payslips/:id" element={<PrintPayslip />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App
