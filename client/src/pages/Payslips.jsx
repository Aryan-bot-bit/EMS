import { useCallback, useEffect, useState } from "react";
import Loading from "../assets/components/Loading";
import PayslipList from "../assets/components/payslip/PayslipList";
import GenratePayslipForm from "../assets/components/payslip/GenratePayslipForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);


  const {user} = useAuth()
  const isAdmin = user?.role === "ADMIN";

  const fetchPayslips = useCallback(async ()=>{
  try {
    const res = await api.get('/payslips')
    setPayslips(res.data.data || res.data.date || [])
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.message);
  }finally{
    setLoading(false)
  }
},[])



  useEffect(() => {
    fetchPayslips()
  }, [fetchPayslips])


  useEffect(() => {
    if (!isAdmin) return;

    api.get("/employees")
      .then((res) => {
        const employeeData = res.data?.data || res.data || [];
        setEmployees(employeeData.filter((employee) => !employee.isDeleted));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || error?.message || "Failed to load employees");
      });
  }, [isAdmin]);

  if (loading) return <Loading />

  return (
   <div className="animate-fade-in">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div>
      <h1 className="page-title">Payslips</h1>
      <p className="page-subtitle">
        {isAdmin
          ? "Generate and manage employee payslips"
          : "Your payslip history"}
      </p>
    </div>

    {isAdmin && <GenratePayslipForm employees={employees} onSuccess={fetchPayslips} />}
  </div>

  <PayslipList payslips={payslips} isAdmin={isAdmin}/>
</div>
  )
}

export default Payslips
