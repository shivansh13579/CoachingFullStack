import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Config from "../../config/Config";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import BeatLoader from "react-spinners/BeatLoader";
import { useAuth } from "../../context/AuthContex";

function UpdateBatch() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState({
    batchName: "",
    studentLimit: "",
    batchStartDate: null,
    batchEndDate: null,
    batchStartTime: "",
    batchEndTime: "",
    batchFee: "",
    description: "",
  });
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getBatch();
  }, [id]);

  const getBatch = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/batch/getBatch/${id}`,
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
        const batch = result.batch;
        setGetData({
          ...batch,
          batchStartDate: batch.batchStartDate
            ? new Date(batch.batchStartDate)
            : null,
          batchEndDate: batch.batchEndDate
            ? new Date(batch.batchEndDate)
            : null,
        });
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e, name) => {
    if (name) {
      setGetData((prev) => ({ ...prev, [name]: e }));
    } else {
      const { name, value } = e.target;
      setGetData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await fetch(
        `${Config.SERVER_URL}/batch/updateBatch/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(getData),
        }
      );
      const result = await apiResponse.json();
      setLoading(false);
      if (result.success === true) {
        toast.success(result.message);
        navigate("/batch");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Update Batch
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
            value={getData.batchName}
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
            value={getData.studentLimit}
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
            selected={getData.batchStartDate}
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
            selected={getData.batchEndDate}
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
            value={getData.batchStartTime}
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
            value={getData.batchEndTime}
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
            value={getData.batchFee}
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
            value={getData.description}
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
              "update Batch"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBatch;
