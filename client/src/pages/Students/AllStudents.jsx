import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Config from "../../config/Config";
import { toast } from "react-toastify";

function AllStudents() {
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllStudents();
  }, []);

  const GetAllStudents = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/student/getAllStudent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await apiResponse.json();
      console.log("result", result);

      setLoading(false);
      if (result.success === true) {
        setAllStudents(result?.student);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  console.log("allStudents", allStudents);

  const handleEdit = (id) => {
    navigate(`/update-student/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/student/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
        GetAllStudents();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-student")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create Student
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    {[
                      "SNo.",
                      "Student Name",
                      "Batch Name",
                      "Father Name",
                      "Mobile",
                      "Parents Mobile",
                      "Actions",
                    ].map((head, i) => (
                      <TableCell
                        key={i}
                        isHeader
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {allStudents.map((student, index) => (
                    <TableRow
                      key={student.studentName}
                      className="hover:bg-gray-50 dark:hover:bg-white/10 transition"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {index + 1}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {student.studentName}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {student.batch?.batchName}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {student.fatherName}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {student.mobile}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {student.parentMobile}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          <FaEdit
                            onClick={() => handleEdit(student._id)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => handleDelete(student._id)}
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
        </>
      )}
    </>
  );
}

export default AllStudents;
