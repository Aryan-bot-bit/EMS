import React from 'react'
import { format } from 'date-fns'
import { Download } from 'lucide-react'

const PayslipList = ({payslips, isAdmin}) => {
  return (
      <div className='card overflow-hidden'>
        
        <div className="overflow-x-auto">
            <table className="table-modern">
                <thead>
                    <tr>
                        {isAdmin && <th>Employee</th>}
                        <th>Pay Period</th>
                        <th>Basic Salary</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payslips.length === 0 ? (
                        <tr>
                            <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-slate-400">No payslips found</td>
                        </tr>
                    ) : (
                        payslips.map((payslip) => {
                            return(
                                <tr key={payslip._id || payslip.id}>
                                    {isAdmin && (
                                    <td className='text-slate-900'>
                                      {payslip.employee?.firstName} {payslip.employee?.lastName}
                                    </td>
                                    )}

                                    <td className='text-slate-500'>
                                      {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                                    </td>

                                    <td className='text-slate-500'>
                                      ${payslip.basicSalary?.toLocaleString()}
                                    </td>

                                    <td className='font-medium text-slate-800'>
                                      ${payslip.netSalary?.toLocaleString()}
                                    </td>

                                    <td>
                                      <span className={`badge ${payslip.status === "APPROVED" ? "badge-success" : payslip.status === "REJECTED" ? "badge-danger" : "badge-warning"}`}>
                                        {payslip.status ?? "ISSUED"}
                                      </span>
                                    </td>

                              {/* {isAdmin && (
  <td>
    {leave.status === "PENDING" && (
      <div className='flex justify-center gap-2'>
        <button disabled={!!processing}
        onClick={()=> handleStatusUpdate(leave._id || leave.id, "APPROVED")} className='p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors'>
          {processing === (leave._id || leave.id) ? <Loader2 className="w-4 h-4 animate-spin"/> : <Check />}
        </button>

         <button 
          onClick={()=> handleStatusUpdate(leave._id || leave.id, "REJECTED")}
          disabled={!!processing}
         className='p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors'>
          {processing === (leave._id || leave.id) ? <Loader2 className="w-4 h-4 animate-spin"/> : <X className="w-4 h-4"/>}
        </button>

      </div>
    )}
  </td> */}
{/* )}       */}


<td className='text-center'>
  <button
    onClick={()=> window.open(`/print/payslips/${payslip._id || payslip.id}`)}
    className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10'
  >
    <Download className="w-3 h-3 mr-1.5" /> Download
  </button>
</td>

                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default PayslipList
