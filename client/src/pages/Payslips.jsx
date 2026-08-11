import { useEffect, useState } from "react";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets";
import Loading from "../assets/components/Loading";
import PayslipList from "../assets/components/payslip/PayslipList";
import GenratePayslipForm from "../assets/components/payslip/GenratePayslipForm";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPayslips(dummyPayslipData);
      if (isAdmin) {
        setEmployees(dummyEmployeeData);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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

    {isAdmin && <GenratePayslipForm employees={employees} />}
  </div>

  <PayslipList payslips={payslips} isAdmin={isAdmin}/>
</div>
  )
}

export default Payslips
