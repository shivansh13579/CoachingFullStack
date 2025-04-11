import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import Config from "../../config/Config";
import { toast } from "react-toastify";
import moment from "moment"; // to format date
import { useAuth } from "../../context/AuthContex";

function AllFee() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [allStudentsFee, setAllStudentsFee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllStudentsFee();
  }, []);

  const GetAllStudentsFee = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/getAllStudentFee`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        setAllStudentsFee(result?.studentFee);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleEdit = (id) => navigate(`/update-student-fee/${id}`);
  const handleDetail = (id) => navigate(`/detail-student-fee/${id}`);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/deleteFee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
        GetAllStudentsFee();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  console.log("allStudentsFee", allStudentsFee);

  return (
    <>
      {loading ? (
        <div className="text-3xl flex items-center justify-center py-5 pb-6 dark:text-gray-300">
          loading...
        </div>
      ) : allStudentsFee.length > 0 ? (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-fee")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create StudentFee
            </p>
          </div>

          {allStudentsFee.map((studentFee, index) => (
            <div
              key={studentFee._id}
              className="mb-8 rounded-lg border border-gray-200 p-4 shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <h2 className="text-base md:text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  👤 Student: {studentFee.student?.studentName}
                </h2>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  📊 Total Paid: ₹{studentFee.totalAmount}
                </p>
                {/* <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  📊 Remaning: ₹
                  {studentFee.totalBatchFee - studentFee.totalAmount}
                </p> */}

                <p
                  onClick={() => handleDetail(studentFee._id)}
                  className="flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300"
                >
                  <span>
                    <FaEye className="text-green-600 text-xl md:text-2xl hover:text-green-800 cursor-pointer" />
                  </span>
                  <span className="hover:text-blue-500">
                    View StudentDetails
                  </span>
                </p>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-100 dark:bg-gray-700">
                    <TableRow>
                      {[
                        "Fee ID",
                        "Amount",
                        "Status",
                        "Batch Name",
                        "Date",
                        "Actions",
                      ].map((head, i) => (
                        <TableCell
                          key={i}
                          isHeader
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200"
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentFee.fees.map((fee) => (
                      <TableRow key={fee._id}>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300">
                          {fee._id}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 dark:text-gray-200">
                          ₹{fee.amount}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 capitalize">
                          {fee.status}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300">
                          {fee.batchName || "N/A"}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 dark:text-gray-200">
                          {moment(fee.createdAt).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300">
                          <div className="flex gap-3">
                            <FaEdit
                              onClick={() => handleEdit(fee._id)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            />

                            <FaTrash
                              onClick={() => handleDelete(fee._id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-fee")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create StudentFee
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-100 dark:bg-gray-700">
                  <TableRow>
                    {[
                      "Fee ID",
                      "Amount",
                      "Status",
                      "Batch Name",
                      "Date",
                      "Actions",
                    ].map((head, i) => (
                      <TableCell
                        key={i}
                        isHeader
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200"
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllFee;
