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
import moment from "moment/moment";
import { useAuth } from "../../context/AuthContex";

function GetAllBatch() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [allBatches, setAllBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllBatch();
  }, []);

  const GetAllBatch = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`${Config.SERVER_URL}/batch/getBatches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        setAllBatches(result?.batch);
      }
      if (result.success === false) {
        toast.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Server error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-batch/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/batch/delete/${id}`,
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
        GetAllBatch();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-3xl flex items-center justify-center py-5 pb-6 dark:text-gray-300">
          loading...
        </div>
      ) : allBatches.length > 0 ? (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-batch")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create Batch
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    {[
                      "SNo.",
                      "Batch Name",
                      "BatchFee",
                      "StartDate",
                      "StartTime",
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
                  {allBatches.map((batch, index) => (
                    <TableRow
                      key={batch.batchName}
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
                        {batch.batchName}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex -space-x-2 text-gray-800 dark:text-white">
                          {batch.batchFee}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {moment(batch.batchStartDate).format("MMM Do YY")}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {moment(batch.batchStartTime, "HH:mm").format("LT")}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          <FaEdit
                            onClick={() => handleEdit(batch._id)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => handleDelete(batch._id)}
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
      ) : (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-batch")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create Batch
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    {[
                      "SNo.",
                      "Batch Name",
                      "BatchFee",
                      "StartDate",
                      "StartTime",
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
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GetAllBatch;
