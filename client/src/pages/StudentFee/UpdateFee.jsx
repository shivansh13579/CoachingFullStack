import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import Config from "../../config/Config";
import { useAuth } from "../../context/AuthContex";

function UpdateFee() {
  const { id } = useParams();
  const { token } = useAuth();
  const [studentFeeData, setStudentFeeData] = useState({
    amount: "",
    student: "",
    batch: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [allBatches, setAllBatches] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getStudentFee();
  }, [id]);

  const getStudentFee = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/getStudentFee/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await apiResponse.json();
      console.log("result", result);
      setLoading(false);
      if (result.success === true) {
        const studentFee = result.studentFee;
        console.log("studen", studentFee);
        setStudentFeeData({
          ...studentFee,
          batch: studentFee.batch._id,
          student: studentFee.student._id,
          status: studentFee.status,
        });
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

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
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    GetAllStudent();
  }, []);

  const GetAllStudent = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/student/getAllStudent`,
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
        setAllStudents(result?.student);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/getStatus`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        setStatus(result.body);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentFeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/studentFee/updateStudentFee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentFeeData),
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result?.success) {
        toast.success(result.message);
        navigate("/student-fee");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log("err", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Update Payment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            value={studentFeeData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Student
          </label>
          <select
            type="select"
            name="student"
            value={studentFeeData.student}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select Option</option>
            {allStudents.map((student, index) => (
              <option key={index} value={student._id}>
                {student.studentName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Batch
          </label>
          <select
            type="select"
            name="batch"
            value={studentFeeData.batch}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select Option</option>
            {allBatches.map((batch, index) => (
              <option key={index} value={batch._id}>
                {batch.batchName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            status
          </label>
          <select
            type="select"
            name="status"
            value={studentFeeData.status}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select Option</option>
            {status.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
          >
            {loading ? (
              <BeatLoader size={10} color="#ffffff" />
            ) : (
              "Update Payment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateFee;
