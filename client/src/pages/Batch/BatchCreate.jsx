import React, { useState } from "react";
import Config from "../../config/Config";
import { useAuth } from "../../context/AuthContex";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";

export default function BatchCreate() {
  const { token } = useAuth();
  const [batchData, setBatchData] = useState({
    batchName: "",
    studentLimit: "",
    batchStartDate: null,
    batchEndDate: null,
    batchStartTime: "",
    batchEndTime: "",
    batchFee: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, name) => {
    if (name) {
      setBatchData((prev) => ({ ...prev, [name]: e }));
    } else {
      const { name, value } = e.target;
      setBatchData((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log("batch", batchData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formateData = {
      ...batchData,
      batchStartDate: batchData.batchStartDate?.toISOString(),
      batchEndDate: batchData.batchEndDate?.toISOString(),
    };
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/batch/createBatch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formateData),
        }
      );
      const result = await apiResponse.json();

      setLoading(false);
      if (result?.success) {
        toast.success(result.message);
        navigate("/batch");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Unexpected error occurred");
      console.log("err", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Create New Batch
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Batch Name
          </label>
          <input
            type="text"
            name="batchName"
            value={batchData.batchName}
            onChange={handleChange}
            placeholder="Enter batch name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Student Limit
          </label>
          <input
            type="number"
            name="studentLimit"
            value={batchData.studentLimit}
            onChange={handleChange}
            placeholder="Enter student limit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Batch Start Date
          </label>
          <DatePicker
            selected={batchData.batchStartDate}
            onChange={(date) => handleChange(date, "batchStartDate")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Batch End Date
          </label>
          <DatePicker
            selected={batchData.batchEndDate}
            onChange={(date) => handleChange(date, "batchEndDate")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Start Time
          </label>
          <input
            type="time"
            name="batchStartTime"
            value={batchData.batchStartTime}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            End Time
          </label>
          <input
            type="time"
            name="batchEndTime"
            value={batchData.batchEndTime}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Batch Fee (₹)
          </label>
          <input
            type="number"
            name="batchFee"
            value={batchData.batchFee}
            onChange={handleChange}
            placeholder="Enter fee amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            rows="3"
            name="description"
            value={batchData.description}
            onChange={handleChange}
            placeholder="Enter batch description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          ></textarea>
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
              "Create Batch"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
