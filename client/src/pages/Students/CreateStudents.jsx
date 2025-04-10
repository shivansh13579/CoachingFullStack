import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import Config from "../../config/Config";
import { useAuth } from "../../context/AuthContex";

function CreateStudents() {
  const { token } = useAuth();
  const [studentData, setStudentData] = useState({
    studentName: "",
    fatherName: "",
    mobile: null,
    parentMobile: null,
    batch: "",
  });
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

  console.log("allBatches", allBatches);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/student/createStudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
        navigate("/student");
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
        Create New Student
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Student Name
          </label>
          <input
            type="text"
            name="studentName"
            value={studentData.studentName}
            onChange={handleChange}
            placeholder="Enter Student name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Batch
          </label>
          <select
            type="select"
            name="batch"
            value={studentData.batch}
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
            Father Name
          </label>
          <input
            type="text"
            name="fatherName"
            value={studentData.fatherName}
            onChange={handleChange}
            placeholder="Enter Father name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mobile
          </label>
          <input
            type="number"
            name="mobile"
            value={studentData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Parents Mobile
          </label>
          <input
            type="number"
            name="parentMobile"
            value={studentData.parentMobile}
            onChange={handleChange}
            placeholder="Enter your parents mobile"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
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
              "Create Student"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateStudents;
